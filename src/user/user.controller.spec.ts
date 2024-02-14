import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Repository, createConnection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard, LocalAuthGuard } from '../auth/guards/';
import { AppModule } from '../app.module';
describe('UserController', () => {
  let controller: UserController;
  const USER_REPOSITORY = getRepositoryToken(User);
  jest.setTimeout(30000);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [JwtService, JwtAuthGuard, LocalAuthGuard,UserService, {
        provide: USER_REPOSITORY, useValue: {
          findOne:jest.fn(),
          save: jest.fn(),
          create: jest.fn(),
        }
      }],
      imports: [AppModule]
    }).compile();

    controller = await module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
