import { Controller, Get, Param, Patch, Delete, Post, Body, NotFoundException, ParseIntPipe, Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSaleDto, editSaleDto } from './dtos';
import { Sale, SaleItems } from './entities';
import { Auth, User } from '../common/decorators';
import { User as userEntity } from '../user/entities/user.entity';
import { SaleService } from './sale.service';
import { ItemService } from '../item/item.service';
import { AppResource } from 'src/app.roles';
import { statusEnum, Method } from './enum';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { InventoryService } from 'src/inventory/inventory.service';
import { ProviderService } from 'src/provider/provider.service';
import { UserService } from 'src/user/user.service';

@ApiTags('Sale')
@Controller('sale')
export class SaleController {
    constructor(
        private saleService: SaleService,
        private itemService: ItemService,
        private inventoryService: InventoryService,
        private providerService: ProviderService,
        private userService: UserService,
    ) { }
    @Get()
    async getAll() {
        return await this.saleService.getMany();
    }
	@Get('/stats')
    async getStats(){
        let users = await this.userService.getCount();
        let providers = await this.providerService.getCount();
        let sales = await this.saleService.getCompletedCount();
        let inventory = await this.inventoryService.getCount();
        let topsales = await this.saleService.getTopSales();
		let topclients = await this.saleService.getTopClients();
        return {providers,sales,inventory,topsales,users, topclients}
    }
	@Get('/lastfour')
    async getLastFout(){
        return await this.saleService.getLastFour();
    }
	@Auth()
    @Get('/client')
    async getAllByClient(@User() user: userEntity) {
        return await this.saleService.getIncompletes(user.id);
    }
	@Auth()
    @Get('/delivery')
    async getAllDelivery(@User() user: userEntity) {
        return await this.saleService.getManyDelivery(user.id);
    }
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.saleService.getOne(id);
    }
	

    @Auth(
        {
            possession: 'own',
            action: 'create',
            resource: AppResource.SALE
        }
    )
    @Post('')
    async create(@Body() dto: CreateSaleDto, @User() user: userEntity, @Res({ passthrough: true }) res) {

		if (dto.paymentMethod !== Method.Cash && dto?.pay_code?.length === undefined) {
			throw new BadRequestException('Debes de enviar al menos un codigo de referencia'); 
		}
        var sale = new Sale();
		sale.paymentMethod = dto.paymentMethod;
		if(dto.paymentMethod !== Method.Cash) sale.pay_code = dto.pay_code
		sale.status = statusEnum.INCOMPLETE;
		sale.total = 0.0;
		sale.user = await this.userService.getOneById(dto?.user);
		if(dto?.user===undefined) {sale.user = user;}
		sale.address = dto.address;
        if (!sale.user) throw new NotFoundException('Usuario Invalido');
        const items = await this.itemService.getByIds(dto.items.map(a => a.id));
        if (items.length === 0 || items.length < dto.items.length) throw new NotFoundException('Uno o varios de los articulos enviados no existen en la base de datos');
        var saleItems: SaleItems[] = [];
        dto.items.forEach(async (e, i) => {
            saleItems[i] = {
                quantity: e.quantity,
                sale_id: sale.id,
                item: items[i],
                id: 0
            };
        });
		for (var i = 0; i < saleItems.length; i++) {
			const inventory = await this.inventoryService.getOneByItem(saleItems[i].item.id);
            sale.total += (saleItems[i].quantity*parseFloat(inventory.item.price.toString()));
		}
        return await this.saleService.create(sale, saleItems);
    }

    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.SALE
        }
    )

    @Patch('/confirm/:id')
    async confirm(@Body() dto: editSaleDto, @Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res) {
        const sale = await this.saleService.getOne(id);
        if (sale.status !== statusEnum.INCOMPLETE) { return res.status(HttpStatus.BAD_REQUEST).json({ message: `El pedido seleccionado ya ha sido procesado` }); }
        /*

        sale.sale_items.forEach(async element => {
            let inventory = new Inventory();
            inventory = await this.inventoryService.getOneByItem(element.item.id);
            if (inventory.stock < element.quantity) { return res.status(HttpStatus.BAD_REQUEST).json({ message: `No hay suficiente stock para el producto: ${inventory.item.name}` }) }
            inventory.stock -= element.quantity;
            this.inventoryService.reduceInventory(inventory);
        });*/
        await this.saleService.confirmSale(id, dto.delivery_man_id);
        return { message: "Pedido aprobado y listo para ser entregado" }
    }
	@Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.SALE
        }
    )

    @Patch('/complete/:id')
    async complete(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res) {
        const sale = await this.saleService.getOne(id);
        if (sale.status !== statusEnum.WAITING) { return res.status(HttpStatus.BAD_REQUEST).json({ message: `El pedido seleccionado ya ha sido procesado` }); }
        /*

        sale.sale_items.forEach(async element => {
            let inventory = new Inventory();
            inventory = await this.inventoryService.getOneByItem(element.item.id);
            if (inventory.stock < element.quantity) { return res.status(HttpStatus.BAD_REQUEST).json({ message: `No hay suficiente stock para el producto: ${inventory.item.name}` }) }
            inventory.stock -= element.quantity;
            this.inventoryService.reduceInventory(inventory);
        });*/
        await this.saleService.completeSaleById(id);
        return { message: "Pedido entregado" }
    }

    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.SALE
        }
    )

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res) {
        const sale = await this.saleService.getOne(id);
        if (sale.status !== statusEnum.WAITING) { return res.status(HttpStatus.BAD_REQUEST).json({ message: `El pedido seleccionado ya ha sido procesado` }); }
        await this.saleService.completeSale(id);
        return { message: "Pedido completado" }
    }

    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.SALE
        }
    )
    @Patch('/cancel/:id')
    async cancelSale(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res) {
        const sale = await this.saleService.getOne(id);
        if (sale.status !== statusEnum.INCOMPLETE) { return res.status(HttpStatus.BAD_REQUEST).json({ message: `Este pedido ya no puede ser cancelado` }); }
        await this.saleService.setSaleCanceled_ByUser(id);
        return { message: "Pedido cancelado" }
    }
    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.SALE
        }
    )
    @Patch('/syscancel/:id')
    async systemCancelSale(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res) {
        const sale = await this.saleService.getOne(id);
        if (sale.status !== statusEnum.INCOMPLETE) { return res.status(HttpStatus.BAD_REQUEST).json({ message: `Este pedido ya no puede ser cancelado` }); }
        await this.saleService.setSaleCanceled_BySystem(id);
        return { message: "Pedido cancelado" }
    }

    @Auth(
        {
            possession: 'any',
            action: 'delete',
            resource: AppResource.SALE
        }
    )
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res) {
        const sale = await this.saleService.getOne(id);
        if (sale.status !== statusEnum.INCOMPLETE) { return res.status(HttpStatus.BAD_REQUEST).json({ message: `Este pedido ya no puede ser cancelado` }); }
        await this.saleService.delete(id);
        return { message: "Venta eliminada" }
    }
  

}
