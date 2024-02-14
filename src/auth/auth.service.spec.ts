import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { createMock } from '@golevelup/ts-jest';
describe('AuthService', () => {
  let service: AuthService;
  const USER_REPOSITORY = getRepositoryToken(User);
  let userRepository: Repository<User>
  jest.setTimeout(30000);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService,{provide: USER_REPOSITORY,useValue:createMock<Repository<User>>()},
    ],imports:[AppModule]
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('find of repository should be a function', () => {
    expect(typeof userRepository.find).toBe('function');
  });
});

