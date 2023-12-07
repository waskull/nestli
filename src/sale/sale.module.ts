import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderService } from 'src/provider/provider.service';
import { Provider } from 'src/provider/entities/provider.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Item } from 'src/item/entities/item.entity';
import { ItemService } from 'src/item/item.service';
import { Sale, SaleItems } from './entities';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { InventoryService } from 'src/inventory/inventory.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Item, Inventory, Sale, SaleItems, Provider, User])
  ,
  ],
  controllers: [SaleController],
  providers: [SaleService, ProviderService, ItemService, InventoryService, UserService],
  exports: [SaleService]
})
export class SaleModule {}
