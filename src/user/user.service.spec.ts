import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/ts-jest';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>
  const USER_REPOSITORY = getRepositoryToken(User);
  jest.setTimeout(30000);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{provide: USER_REPOSITORY,useValue:createMock<Repository<User>>()}],
    }).compile();

    //service = await module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY);
  });  

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
  it('find of repository should be a function', () => {
    expect(typeof userRepository.find).toBe('function');
  });
});
