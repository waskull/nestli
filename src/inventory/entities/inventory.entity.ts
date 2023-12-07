import { Item } from "../../item/entities/item.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('inventory')
export class Inventory{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer', nullable: false})
    stock:number;

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date;

    @OneToOne(() => Item, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: 'item_id'})
    item: Item;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updateAt?: Date;
}