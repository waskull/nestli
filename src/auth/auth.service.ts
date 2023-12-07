import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    
    constructor(
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

    async checkEmail(email:string): Promise<any>{
        return await this.userService.findByEmail({email});
    }
    

    sendMail(email:string, newPassword:string, firstname:string, lastname:string):void {
        const html = `
        <h1>CALI APP</h1>
        <ul>
            <li>Hola ${firstname+" "+lastname}</li>
        </ul>
        <p>${"Tu nueva clave es : "+newPassword+""}</p>
        <br>
        <p>Recuerda que puedes cambiar esta clave desde nuestra app. </p>
        <br>
        <p>Helados CALI. </p>
    `;
        this.mailerService.sendMail({
            to: email,
            from: 'forrosauto@gmail.com',
            subject: 'Reinicio de clave',
            text:'D:',
            html: html
        });
    }
}
