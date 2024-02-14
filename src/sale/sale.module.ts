import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Item } from '../item/entities/item.entity';
import { ItemService } from '../item/item.service';
import { Sale, SaleItems } from './entities';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { InventoryService } from '../inventory/inventory.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Item, Inventory, Sale, SaleItems, User])
  ,
  ],
  controllers: [SaleController],
  providers: [SaleService, ItemService, InventoryService, UserService],
  exports: [SaleService]
})
export class SaleModule {}
