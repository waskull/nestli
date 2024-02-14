import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from '../common/decorators';
import { User as UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/';
import { ResetDTO } from './dtos/reset.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
    @Body() LoginDto: LoginDto, 
    @User() user:UserEntity,
    @Res({ passthrough: true }) res
    ){
        const data = await this.authService.login(user);
        const {accessToken, ...rest} = data;
        return { message:'Login Exitoso', data: data }
    }

    @Auth()
    @Get('me')
    async whoiam(@User() user:UserEntity){
        return user;
    }

    @Auth()
    @Get('refresh')
    async refreshToken(
    @User() user:UserEntity, 
    @Res({ passthrough: true }) res){
        const data = await this.authService.login(user);
        const {accessToken, ...rest} = data;
        return {
            message:'refresh exitoso',
            data: accessToken
        }
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) res){
        res.cookie('auth-cookie', '', { 
            expires: new Date(), 
            httpOnly:true, secure:true, 
            sameSite: 'Strict' });
        return {message: 'Logout exitoso'}
    }

    @Post('/resetpassword')
    async send(@Body() ResetDTO: ResetDTO, @Res({ passthrough: true }) res){
        const result = await this.authService.checkEmail(ResetDTO.email);
        console.log(result);
        if (result === null) { return res.status(HttpStatus.BAD_REQUEST).json({ message: `Este correo no existe` }); }
        if(result?.roles?.includes('admin')){
            return res.status(HttpStatus.BAD_REQUEST).json({ message: `La clave de administrador solo puede ser recuperada por un administrador` });
        }
        else{
			console.log(result);
            const newPassword = Math.random().toString(36).substring(2,10);
            await this.authService.editUser(result.id, newPassword);
            try{
                await this.authService.sendMail(ResetDTO.email,newPassword,result.firstname, result.lastname);
            }catch(err){
                console.log(err);
            }
            return res.status(HttpStatus.OK).json({ message:`Una nueva clave fue enviada a tu correo electronico`});
        }
    }
}
