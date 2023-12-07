import { Item } from "../../item/entities/item.entity";
import { Column, JoinColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable, UpdateDateColumn,  } from "typeorm";
import { Sale } from "./sale.entity";


@Entity('sale_items')
export class SaleItems{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Item, (item) => item.order_item, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: "item_id"})
    item!: Item;


    @Column({type: 'integer', nullable:false})
    quantity!: number;

    @ManyToOne(type => Sale, (sale) => sale.sale_items)
    @JoinColumn({name: "sale_id"})
    sale_id!: number;
    
}

