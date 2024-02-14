import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../item/entities/item.entity';
import { ItemService } from '../item/item.service';
import { createMock } from '@golevelup/ts-jest';
describe('InventoryService', () => {
  //let service: InventoryService;
  let repo: Repository<Inventory>;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryService, {
        provide: getRepositoryToken(Inventory), useValue: createMock<Repository<Inventory>>()
      },
        ItemService, {
          provide: getRepositoryToken(Item), useValue: createMock<Repository<Item>>()
        }],
    }).compile();

    //service = module.get<InventoryService>(InventoryService);
    repo = module.get<Repository<Inventory>>(getRepositoryToken(Inventory));
  });

  it('should be defined', () => {
    expect(typeof repo.find).toBe('function');
    //expect(service).toBeDefined();
  });
});
