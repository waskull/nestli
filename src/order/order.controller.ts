import { Controller, Get, Param, Patch, Delete, Post, Body, NotFoundException, ParseIntPipe, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Dates, createOrderDto, reportDTO } from './dtos';
import { Order, OrderItems } from './entities';
import { Auth, User } from '../common/decorators';
import { User as userEntity } from '../user/entities/user.entity';
import { OrderService } from './order.service';
import { ItemService } from '../item/item.service';
import { AppResource } from '../app.roles';
import { Response } from 'express';

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService,
        private itemService: ItemService,
    ){}
    @Get()
    async getAll(){
        return await this.orderService.getMany();
    }
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return await this.orderService.getOne(id);
    }
    @Auth(
        {
            possession: 'own',
            action: 'create',
            resource: AppResource.ORDER
        }
    )
    @Post()
    async create(@Body() dto: createOrderDto, @User() user: userEntity){
        let order = new Order();
        order.bought_by = user;
        order.price = dto.price;
        if(!order.bought_by) throw new NotFoundException('Vendedor Invalido');
        const items = await this.itemService.getByIds(dto.items.map(a => a.id));
        if(items.length === 0 || items.length < dto.items.length) throw new NotFoundException('Uno o varios de los articulos enviados no existen en la base de datos');
        var orderItems: OrderItems[] = [];
        dto.items.forEach((e, i) => {
            orderItems[i] = {
                quantity: e.quantity,
                order_id: order.id,
                item: items[i],
                id: 0
            }
        });
        return await this.orderService.create(order, orderItems);
    }
    
    @Post('/date')
    async getByDates(@Body() dates:Dates,@Res() response: Response){
        const pdfDoc = this.orderService.generatePdf(await this.orderService.getManyByDate(dates));
        pdfDoc.pipe(response);
        pdfDoc.end();
    }
    @Post('/report')
    async getReport(@Body() dto:reportDTO,@Res() response: Response){
        console.log(dto.id);
        const pdfDoc = this.orderService.getReport(await this.orderService.getOne(dto.id));
        pdfDoc.pipe(response);
        pdfDoc.end();
    }
    // @Patch(':id')
    // async edit(@Param('id', ParseIntPipe) id: number, @Body() dto: createOrderDto, @User() user: userEntity){
    //     const order = await this.checkItems(dto, user.id);
    //     await this.orderService.edit(id,order);
    //     return {message:"Compra editada"}
    // }
    @Auth(
        {
            possession: 'own',
            action: 'delete',
            resource: AppResource.ORDER
        }
    )
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        await this.orderService.delete(id);
        return {message:"Compra eliminada"}
    }
}
