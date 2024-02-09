import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Item } from '../item/entities/item.entity';
import { ItemService } from '../item/item.service';
import { Order } from './entities';
import { OrderItems } from './entities/';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { InventoryService } from 'src/inventory/inventory.service';

@Module({
  imports:[
  TypeOrmModule.forFeature([Order, Item, OrderItems, Inventory])
,
],
  controllers: [OrderController],
  providers: [OrderService, ItemService, InventoryService],
  exports: [OrderService]
})
export class OrderModule {}
