import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

describe('InventoryController', () => {
  let controller: ItemController;
  let service: ItemService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      imports: [AppModule],
      providers: [{
        provide: ItemService,
        useValue: {
          findOne: jest.fn(),
          save: jest.fn(),
          create: jest.fn(),
        }
      }]
    }).compile();

    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
