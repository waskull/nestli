import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from '../common/decorators';
import { User as UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/';

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
        // res.cookie("auth-cookie", data.accessToken, {
        //     maxAge: 2 * 60 * 60 * 1000, 
        //     httpOnly:true, secure:false, 
        //     sameSite: 'Strict'
        // });
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

    @Auth()
    @Post('/resetpassword')
    async send(@Body() ResetDTO, @Res({ passthrough: true }) res){
        console.log("Email", ResetDTO.email);
        const result = await this.authService.checkEmail(ResetDTO.email);
        console.log("Result", result);
        if (!result) { return res.status(HttpStatus.BAD_REQUEST).json({ message: `Este correo no existe` }); }
        else{
            await this.authService.sendMail("mrtncsto@gmail.com","asdgfgafdg","Martinn","Castillo");
        }
    }
}
