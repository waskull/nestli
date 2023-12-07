import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Item } from 'src/item/entities/item.entity';
import { In, Repository } from 'typeorm';
import {Order, OrderItems} from './entities/'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItems)
        private readonly orderitemsRepository: Repository<OrderItems>,
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>
        ){}
    async getMany(): Promise<Order[]>{
        return await this.orderRepository.find({relations:['order_items', 'order_items.item', 'bought_by']});
    }
    async getOne(id: number): Promise<Order>{
        const route = await this.orderRepository.findOne({relations:['order_items', 'order_items.item', 'bought_by'], where:{id:id}})
        if(!route) throw new NotFoundException('La orden no existe');
        return route;
    }

    async edit(id: number, order: Order){
        const route = await this.getOne(id);
        const editedClient = Object.assign(route, order);
        return await this.orderRepository.save(editedClient);
    }
    async create(order: Order, newItems: OrderItems[]): Promise<Order>{
        console.log(order);
        const newOrder = this.orderRepository.create({
            bought_by:{id:order.bought_by.id},
            price:order.price
        });
        const savedOrder = await this.orderRepository.save(newOrder);


        newItems.forEach(async e => {
            e.order_id = savedOrder.id;
            let inventory = await this.inventoryRepository.findOne({where:{item:{id:e.item.id}}});
            inventory.stock += e.quantity;
            const saveInventory = await this.inventoryRepository.save(inventory);
        });

        //let inventory = await this.inventoryRepository.findBy({id:In(newItems.map(i => i.id))});

        const newitems = await this.orderitemsRepository.create(newItems);
        const saveItems = await this.orderitemsRepository.save(newitems);


        return savedOrder;
    }
    async delete(id: number){
        const order = await this.getOne(id)
        return await this.orderRepository.delete(id)
    }
    
}

