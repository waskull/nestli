import { Controller, Get, Param, Patch, Delete, Post, Body, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from '../app.roles';
import { Auth } from '../common/decorators';
import { CreateInventoryDto, EditInventoryDto } from './dtos';
import { InventoryService } from './inventory.service';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
    constructor(
        private readonly inventoryService: InventoryService,
    ){}
    @Get()
    async getAll(){
        return await this.inventoryService.getManyWithoutStock();
    }
	@Get('/stock')
    async getStock(){
        return await this.inventoryService.getMany();
    }
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return await this.inventoryService.getOne(id);
    }
    @Auth(
        {
            possession: 'any',
            action: 'create',
            resource: AppResource.INVENTORY
        }
    )
    @Patch(':id')
    async edit(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateInventoryDto){
        const inventory = await this.inventoryService.getOne(id);
        await this.inventoryService.edit(id,dto);
        return {message:"Inventario editado"}
    }
    @Auth(
        {
            possession: 'any',
            action: 'delete',
            resource: AppResource.INVENTORY
        }
    )
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        const inventory = await this.inventoryService.getOne(id);
        await this.inventoryService.delete(id);
        return {message:"Inventario eliminado"}
    }
}
