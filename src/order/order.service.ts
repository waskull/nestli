import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Item } from 'src/item/entities/item.entity';
import { Between, In, Repository } from 'typeorm';
import { Order, OrderItems } from './entities/'
import { Dates } from './dtos';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { LOGO64 } from 'src/config/constants';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItems)
        private readonly orderitemsRepository: Repository<OrderItems>,
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>
    ) { }
    async getMany(): Promise<Order[]> {
        return await this.orderRepository.find({ relations: ['order_items', 'order_items.item', 'bought_by'], order: { createdAt: "DESC" } });
    }
    async getOne(id: number): Promise<Order> {
        const route = await this.orderRepository.findOne({ relations: ['order_items', 'order_items.item', 'bought_by'], where: { id: id } })
        if (!route) throw new NotFoundException('La orden no existe');
        return route;
    }
    async getManyByDate(dates: Dates): Promise<Order[]> {
        return await this.orderRepository.find({
            relations: ['order_items', 'order_items.item', 'bought_by'], where: {
                createdAt: Between(
                    dates.start,
                    dates.end
                ),
            }
        });
    }

    getReport(order: Order): PDFKit.PDFDocument{
        var fonts = {
            Roboto: {
                normal: 'fonts/Roboto-Regular.ttf',
                bold: 'fonts/Roboto-Medium.ttf',
                italics: 'fonts/Roboto-Italic.ttf',
                bolditalics: 'fonts/Roboto-MediumItalic.ttf'
            }
        };
        let title = 'REPORTE DE COMPRA';
        const code = order.id;
        const printer = new PdfPrinter(fonts);
        const docDefinition = {
            header: '',
            content: [
                {
                    image: LOGO64,
                    width: 150,
                    alignment: 'center'

                },
                {
                    text: title,
                    fontSize: 14,
                    bold: true,
                    alignment: 'center',
                    decoration: 'underline',
                    color: '#18409d'
                },

                {
                    columns: [
                        [
                            {
                                text: `Fecha: ${new Date(order.createdAt).toLocaleDateString("es-VE", { day: "2-digit", month: "2-digit", year: "numeric"})}`,
                                alignment: 'right'
                            },
                            {
                                text: `Compra: #${code}`,
                                alignment: 'right'
                            },
                            
                            {
                                text: `Solicitado por: ${order?.bought_by?.firstname} ${order?.bought_by?.lastname}`,
                                alignment: 'left'
                            }
                        ]
                    ]
                },
                {
                    text: 'DETALLES DE LAS COMPRAS',
                    style: 'sectionHeader'
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', 'auto'],
                        body: [
                            ['ID', 'Artículo', 'Cantidad'],
                            ...order.order_items.map(p => ([p?.id, p?.item.name, p?.quantity])),
                        ]
                    },
                },
                [
                    {
                        text: 'Total:',
                        bold: true,
                        fontSize: 14,
                        alignment: 'right',
                        italics: true,
                        border: [true, false, false, true],
                        margin: [0, 5, 0, 5],
                    },
                    {
                        text: order.price,
                        bold: true,
                        fontSize: 14,
                        alignment: 'right',
                        border: [false, false, false, true],
                        fillColor: '#f5f5f5',
                        margin: [0, 0, 0, 5],
                        decoration: 'underline'
                    },
                ],
                {
                    text: 'Notas',
                    style: 'sectionHeader'
                },
                {
                    ul: [
                        'Este es un reporte de compra generado por el sistema Cali Maturin.'
                    ],
                },
            ],
            styles: {
                sectionHeader: {
                    bold: true,
                    decoration: 'underline',
                    fontSize: 14,
                    margin: [0, 15, 0, 15]
                }
            }

        } as TDocumentDefinitions;
        const options = {

        }
        return printer.createPdfKitDocument(docDefinition, options);
    }

    generatePdf(orders: Order[]): PDFKit.PDFDocument {
        var fonts = {
            Roboto: {
                normal: 'fonts/Roboto-Regular.ttf',
                bold: 'fonts/Roboto-Medium.ttf',
                italics: 'fonts/Roboto-Italic.ttf',
                bolditalics: 'fonts/Roboto-MediumItalic.ttf'
            }
        };
        let title = 'REPORTE DE COMPRAS';
        let total = 0;
        const code = Math.random().toString(36).slice(2).toUpperCase();
        const printer = new PdfPrinter(fonts);
        var data: any[] = [];
        orders.forEach(r => {
            let name:string = '';
            data.push({
              id: r.id,
              price: r.price,
              bought_by: r.bought_by,
              items: r.order_items.map((res: { item: {name:string;} }) => {
                name += res.item.name+", ";
              }),
              item: name,
              quantity: r.order_items[0].quantity
            });
         
          total+=(parseFloat(r.price.toString()));

        });
        const docDefinition = {
            header: '',
            content: [
                {
                    image: LOGO64,
                    width: 150,
                    alignment: 'center'

                },
                {
                    text: title,
                    fontSize: 14,
                    bold: true,
                    alignment: 'center',
                    decoration: 'underline',
                    color: '#18409d;'
                },

                {
                    columns: [
                        [
                            {
                                text: `Fecha: ${new Date().toLocaleDateString("es-VE", { day: "2-digit", month: "2-digit", year: "numeric"})}`,
                                alignment: 'right'
                            },
                            {
                                text: `Reporte: ${code}`,
                                alignment: 'right'
                            }
                        ]
                    ]
                },
                {
                    text: 'DETALLES DE LA COMPRAS',
                    style: 'sectionHeader'
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', 'auto', 'auto'],
                        body: [
                            ['ID', 'Artículos', 'Precio', 'Solicitado Por'],
                            ...data.map((p: { item: string; id: number; price: string; bought_by: { firstname: string; lastname: string } }) => ([p.id, p.item, p.price, `${p.bought_by.firstname} ${p.bought_by.lastname}`])),
                        ]
                    },
                },
                [
                    {
                        text: 'Total pagado por Pedidos:',
                        bold: true,
                        fontSize: 14,
                        alignment: 'right',
                        italics: true,
                        border: [true, false, false, true],
                        margin: [0, 5, 0, 5],
                    },
                    {
                        text: total,
                        bold: true,
                        fontSize: 14,
                        alignment: 'right',
                        border: [false, false, false, true],
                        fillColor: '#f5f5f5',
                        margin: [0, 0, 0, 5],
                        decoration: 'underline'
                    },
                ],
                {
                    text: 'Nota:',
                    style: 'sectionHeader'
                },
                {
                    ul: [
                        'Esto es un reporte de pedidos generado por el sistema Cali.'
                    ],
                },
            ],
            styles: {
                sectionHeader: {
                    bold: true,
                    decoration: 'underline',
                    fontSize: 14,
                    margin: [0, 15, 0, 15]
                }
            }

        } as TDocumentDefinitions;

        const options = {

        }
        return printer.createPdfKitDocument(docDefinition, options);
    }

    async edit(id: number, order: Order) {
        const route = await this.getOne(id);
        const editedClient = Object.assign(route, order);
        return await this.orderRepository.save(editedClient);
    }
    async create(order: Order, newItems: OrderItems[]): Promise<Order> {
        console.log(order);
        const newOrder = this.orderRepository.create({
            bought_by: { id: order.bought_by.id },
            price: order.price
        });
        const savedOrder = await this.orderRepository.save(newOrder);


        newItems.forEach(async e => {
            e.order_id = savedOrder.id;
            let inventory = await this.inventoryRepository.findOne({ where: { item: { id: e.item.id } } });
            inventory.stock += e.quantity;
            const saveInventory = await this.inventoryRepository.save(inventory);
        });

        //let inventory = await this.inventoryRepository.findBy({id:In(newItems.map(i => i.id))});

        const newitems = await this.orderitemsRepository.create(newItems);
        const saveItems = await this.orderitemsRepository.save(newitems);


        return savedOrder;
    }
    async delete(id: number) {
        const order = await this.getOne(id);
        await this.orderitemsRepository.delete({order_id:id});
        return await this.orderRepository.delete(id)
    }

}

