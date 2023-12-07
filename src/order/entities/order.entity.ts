import { User } from "../../user/entities/user.entity";
import { Column, JoinColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable, UpdateDateColumn,  } from "typeorm";
import { OrderItems } from "./order_item.entity";
import { IsOptional } from "class-validator";

@Entity('order')
export class Order{
    @PrimaryGeneratedColumn()
    @IsOptional()
    id?: number;

    @Column({type: 'decimal', nullable: false})
    price!: number;

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updateAt?: Date;


    @ManyToOne(type => User, (user) => user.orders, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: "user_id"})
    bought_by: User;

    @OneToMany(type => OrderItems, (order_items) => order_items.order_id, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: "order_items"})
    order_items: OrderItems[];

}