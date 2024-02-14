import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { AppModule } from '../app.module';
import { InventoryService } from './inventory.service';

describe('InventoryController', () => {
  let controller: InventoryController;
  let service: InventoryService;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      imports: [AppModule],
      providers: [{
        provide: InventoryService,
        useValue: {
          findOne: jest.fn(),
          save: jest.fn(),
          create: jest.fn(),
        }
      }]
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
