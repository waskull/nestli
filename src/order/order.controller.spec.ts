import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { AppModule } from '../app.module';
import { OrderService } from './order.service';
import { ItemService } from '../item/item.service';
import { InventoryService } from '../inventory/inventory.service';

describe('OrderController', () => {
  let controller: OrderController;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      imports: [AppModule],
      providers: [{
        provide: OrderService,
        useValue: {
          findOne: jest.fn(),
          save: jest.fn(),
          create: jest.fn(),
        }
      },
      {
        provide: ItemService,
        useValue: {
          findOne: jest.fn(),
          save: jest.fn(),
          create: jest.fn(),
        }
      },
      {
        provide: InventoryService,
        useValue: {
          findOne: jest.fn(),
          save: jest.fn(),
          create: jest.fn(),
        }
      }
      ]
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
