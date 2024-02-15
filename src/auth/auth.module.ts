import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy } from './strategies/';
import { JWT_KEY } from '../config/constants';
import {ConfigService} from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordRecovery } from './entities/password.entity';


@Module({
  imports:[PassportModule.register({
    defaultStrategy:'jwt'
  }),
  TypeOrmModule.forFeature([PasswordRecovery]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory:(config: ConfigService) =>({
      secret: config.get<string>(JWT_KEY),
      signOptions: { expiresIn:'7d'} //240
      })
    }),
    UserModule,MailerModule.forRoot({
  
        transport: {
          host: "localhost",
          port: 1025,
        },
    })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {

}
