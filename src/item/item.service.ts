import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../inventory/entities/inventory.entity';
import { In, Repository } from 'typeorm';
import { CreateItemDto, EditItemDto } from './dtos/';
import {Item} from './entities/item.entity'

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>){}
    async getMany(): Promise<Item[]>{
        return await this.itemRepository.find({relations:["inventory"]});
    }
    async getOne(id: number): Promise<Item>{
        const item = await this.itemRepository.findOne({where:{id:id}})
        if(!item) throw new NotFoundException('El Articulo no existe');
        return item;
    }
    async findOneByName(name: string): Promise<Item>{
        const item = await this.itemRepository.findOne({where:{name:name}})
        if(item) throw new BadRequestException('Ya existe ese articulo');
        return item;
    }
    async edit(id: number, dto: EditItemDto){
        const item = await this.getOne(id);
        const editedItem = Object.assign(item, dto);
        return await this.itemRepository.save(editedItem);
    }
    async create(dto: CreateItemDto){
        const data = this.itemRepository.create(dto);
        const item = await this.itemRepository.save(data);

        const inventory = new Inventory();
        inventory.stock = 0;
        inventory.item = item;

        const dataI = this.inventoryRepository.create(inventory);
        await this.inventoryRepository.save(dataI);
        return item;
    }
    async delete(id: number){
        const item = await this.getOne(id)
		await this.inventoryRepository.delete(item.id);
        return await this.itemRepository.delete(item.id);
    }
    async getByIds(items: number[]):Promise<Item[]>{
        return await this.itemRepository.findBy({id:In(items)});
    }

    async getCount(){
        return await this.itemRepository.count();
    }
}
