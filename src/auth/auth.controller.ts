import { BadRequestException, Body, Controller, Get, HttpStatus, NotFoundException, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from '../common/decorators';
import { User as UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/';
import { ResetDTO, PasswordDTO } from './dtos/reset.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Body() LoginDto: LoginDto,
        @User() user: UserEntity,
        @Res({ passthrough: true }) res
    ) {
        const data = await this.authService.login(user);
        const { accessToken, ...rest } = data;
        return { message: 'Login Exitoso', data: data }
    }

    @Auth()
    @Get('me')
    async whoiam(@User() user: UserEntity) {
        return user;
    }

    @Auth()
    @Get('refresh')
    async refreshToken(
        @User() user: UserEntity,
        @Res({ passthrough: true }) res) {
        const data = await this.authService.login(user);
        const { accessToken, ...rest } = data;
        return {
            message: 'refresh exitoso',
            data: accessToken
        }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res) {
        res.cookie('auth-cookie', '', {
            expires: new Date(),
            httpOnly: true, secure: true,
            sameSite: 'Strict'
        });
        return { message: 'Logout exitoso' }
    }

    @Post('/resetpassword')
    async send(@Body() ResetDTO: ResetDTO, @Res({ passthrough: true }) res) {
        const result = await this.authService.checkEmail(ResetDTO.email);
        console.log(result);
        if (!result) throw new NotFoundException('El correo no existe');
        if (result?.roles?.includes('admin')) {
            throw new BadRequestException('La clave de administrador solo puede ser recuperada por un administrador');
        }
        const code = Math.random().toString(36).substring(2, 10);
        const data = await this.authService.createCode({ code: code, user_id: result.id });
        await this.authService.sendMail(ResetDTO.email, code, result.firstname, result.lastname); 
        return ({ message: `Una nueva clave fue enviada a tu correo electronico` });

    }

    @Post('/repass')
    async recovery(@Body() PasswordDTO: PasswordDTO, @Res({ passthrough: true }) res) {
        const result = await this.authService.checkEmail(PasswordDTO.email);
        if (!result) throw new NotFoundException('El correo no existe');
        if (result?.roles?.includes('admin')) {
            throw new BadRequestException('La clave de administrador solo puede ser recuperada por un administrador');
        }
        const code = await this.authService.checkCode(PasswordDTO.code, result.id); console.log("ASD: ", code);
        
        if (!code) throw new NotFoundException('El codigo es inválido');

        if (code.code !== PasswordDTO.code) {
            throw new BadRequestException('El codigo suministrado por la app Cali no concide con el codigo enviado a tu correo electronico');
        }

        //check date
        // let date = new Date();
        // date.setDate(date.getDate() + 24);
        if (code.IsInvalid === true) {
            
            throw new BadRequestException('El codigo enviado ya expiro');
        }
        const data = await this.authService.editUser(result.id, PasswordDTO.password);
        code.IsInvalid = true;
        await this.authService.disableCode(code);
        return { message: { message: `La clave fue cambiada, ya puedes iniciar sesión` } };

    }
}
