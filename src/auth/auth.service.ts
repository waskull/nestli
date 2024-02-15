import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { PasswordRecovery } from './entities/password.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(PasswordRecovery)
        private readonly passwordRecovery: Repository<PasswordRecovery>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
        ) {}
    
    async validateUser(email:string,password:string): Promise<any>{
        const user = await this.userService.findByEmail({email});
        if(user && await compare(password, user.password)){
            const {password, ...rest} = user;
            return rest;
        }
        return null;
    }

    async login(user: User){
        const { id, ...rest } = user;
        const payload = { sub: id };
        return {
            user,
            accessToken: this.jwtService.sign(payload)
        }
    }

    async checkEmail(email:string): Promise<User>{
        return await this.userService.getByEmail({email});
    }

    async checkCode(code:string,id:number): Promise<PasswordRecovery>{
        return await this.passwordRecovery.findOne({where: {code:code, user:{id:id}}, order: { createdAt: "DESC" }});
    }

    async createCode(passwordRecovery:{code:string, user_id:number}){
        const newCode = await this.passwordRecovery.create({code:passwordRecovery.code, user:{id:passwordRecovery.user_id}});
        return await this.passwordRecovery.save(newCode);
    }

    async disableCode(passwordRecovery:PasswordRecovery): Promise<PasswordRecovery>{
        return await this.passwordRecovery.save(passwordRecovery);
    }
	
	async editUser(id:number, newPassword:string): Promise<any>{
        return await this.userService.editPassword(id, newPassword);
    }
    

    sendMail(email:string, newPassword:string, firstname:string, lastname:string):void {
        const html = `
        <h1>CALI APP</h1>
        <ul>
            <li>Hola ${firstname} ${lastname}</li>
        </ul>
        <p>${"Tu nueva clave es : "+newPassword}</p>
        <br>
        <p>Helados CALI. </p>
    `;
        this.mailerService.sendMail({
            to: email,
            from: 'cali@gmail.com',
            subject: 'Reinicio de clave',
            text:'Helados CALI',
            html: html
        });
    }
}
