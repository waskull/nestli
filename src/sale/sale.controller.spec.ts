import { Test, TestingModule } from '@nestjs/testing';
import { SaleController } from './sale.controller';
import { AppModule } from '../app.module';
import { SaleService } from './sale.service';
import { ItemService } from '../item/item.service';
import { InventoryService } from '../inventory/inventory.service';
import { UserService } from '../user/user.service';

describe('SaleController', () => {
  let controller: SaleController;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleController],
      imports: [AppModule],
      providers: [{
        provide: SaleService,
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
      },
      {
        provide: UserService,
        useValue: {
          findOne: jest.fn(),
          save: jest.fn(),
          create: jest.fn(),
        }
      }
      ]
    }).compile();

    controller = module.get<SaleController>(SaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
