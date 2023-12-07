import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Sale, SaleItems } from './entities/'
import { statusEnum } from './enum';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SaleService {
    constructor(
        @InjectRepository(Sale)
        private readonly saleRepository: Repository<Sale>,
        @InjectRepository(SaleItems)
        private readonly saleItemRepository: Repository<SaleItems>
    ) { }
    async getMany(): Promise<Sale[]> {
        return await this.saleRepository.find({ relations: ['sale_items', 'sale_items.item', 'user', 'delivery_man'], order: { createdAt: "DESC" } });
    }
    async getManyDelivery(delivery_man: number): Promise<Sale[]> {
        return await this.saleRepository.find({ relations: ['sale_items', 'sale_items.item','user'], where: { delivery_man:{id:delivery_man}, status: statusEnum.WAITING }, order: { updateAt: "DESC" } });
    }
    async getLastFour(): Promise<Sale[]> {
        return await this.saleRepository.find({ relations: ['sale_items', 'sale_items.item', 'user'], order: { createdAt: "DESC" }, take: 4 });
    }
    async getOne(id: number): Promise<Sale> {
        const sale = await this.saleRepository.findOne({ relations: ['sale_items', 'sale_items.item', 'user'], where: { id: id } })
        if (!sale) throw new NotFoundException('La venta no existe');
        return sale;
    }
    async getTopSales(): Promise<Sale[]> {
        return await this.saleItemRepository.query('select name, sum(quantity) as sales from sale_items inner join item on sale_items.item_id = item.id  group by name order by sum(quantity) desc limit 5;');
    }
    async getTopClients(): Promise<Sale[]> {
        return await this.saleItemRepository.query('select firstname,count(*) as sales from sale inner join user on user.id = sale.user where sale.status="Producto entregado" group by firstname order by sales desc limit 5; ;');
    }
    async getIncompletes(client_id: number): Promise<Sale[]> {
        const sale = await this.saleRepository.find({
            relations: ['sale_items', 'sale_items.item'], where: {
                user: {id:client_id}

            },
            order: { createdAt: "DESC" }
        })
        if (!sale) throw new NotFoundException('La venta no existe');
        return sale;
    }
    async getWaiting(user: number): Promise<Sale[]> {
        const sale = await this.saleRepository.find({ relations: ['sale_items', 'sale_items.item', 'user'], where: { status: statusEnum.WAITING } })
        if (!sale) throw new NotFoundException('La venta no existe');
        return sale;
    }
    async getCompletedCount(): Promise<number> {
        const sale = await this.saleRepository.find({ where: { status: statusEnum.COMPLETED } })
        if (!sale) return 0;
        return sale.length;
    }

    async edit(id: number, salee: Sale) {
        const sale = await this.getOne(id);
        const editedClient = Object.assign(sale, salee);
        return await this.saleRepository.save(editedClient);
    }

    async completeSale(id: number) {
        const sale = await this.getOne(id);
        sale.status = statusEnum.COMPLETED;
        return await this.saleRepository.save(sale);
    }

    async confirmSale(id: number, delivery_man: number) {
        const sale = await this.getOne(id);
        return await this.saleRepository.save({
            id: sale.id,
            delivery_man: {id: delivery_man},
            status: statusEnum.WAITING
        });
    }
	async completeSaleById(id: number) {
        const sale = await this.getOne(id);
        return await this.saleRepository.save({
            id: sale.id,
            status: statusEnum.COMPLETED
        });
    }

    async setSaleCanceled(id: number) {
        const sale = await this.getOne(id);
        sale.status = statusEnum.CANCELED_SYSTEM;
        return await this.saleRepository.save(sale);
    }

    async getCount() {
        return await this.saleRepository.count();
    }

    async setSaleCanceled_ByUser(id: number) {
        const sale = await this.getOne(id);
        sale.status = statusEnum.CANCELED;
        return await this.saleRepository.save(sale);
    }
    async setSaleCanceled_BySystem(id: number) {
        const sale = await this.getOne(id);
        sale.status = statusEnum.CANCELED_SYSTEM;
        return await this.saleRepository.save(sale);
    }

    async create(sale: Sale, newItems: SaleItems[]) {

        const newSale = this.saleRepository.create({
            user: {id:sale.user.id},
            status: sale.status,
            paymentMethod: sale.paymentMethod,
            pay_code: sale.pay_code,
            total: sale.total,
            address: sale.address
        });

        const savedOrder = await this.saleRepository.save(newSale);

        newItems.forEach(async e => {
            e.sale_id = savedOrder.id;
        });

        const newitems = await this.saleItemRepository.create(newItems);
        const saveItems = await this.saleItemRepository.save(newitems);


        return savedOrder;
    }
    async delete(id: number) {
        await this.saleItemRepository.delete({ sale_id: id });
        return this.saleRepository.delete(id);
    }



}

