import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from './guards/';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { PasswordRecovery } from './entities/password.entity';


describe('AuthController', () => {
  let controller: AuthController;
  const USER_REPOSITORY = getRepositoryToken(User);
  jest.setTimeout(30000);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtService, {
        provide: USER_REPOSITORY, useValue: {
          findOne: jest.fn(),
          save: jest.fn(),
          create: jest.fn(),
        }
      },
        {
          provide: getRepositoryToken(PasswordRecovery), useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          }
        }],
      imports: [AppModule]
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
