import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Rol } from "../enum";
import { hash } from 'bcrypt'
import { Sale } from "../../sale/entities";
import { Order } from "../../order/entities";

@Entity('user')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    firstname!:string;

    @Column({type: 'varchar', length: 255, nullable: false})
    lastname!:string;

    @Column({type: 'varchar', length: 255, nullable: false})
    email!:string;

    @Column({type: 'varchar', length: 255, nullable: false, select: false})
    password!:string;

    @Column({type: 'simple-array', nullable: false})
    roles: string[];

    @Column({type: 'integer', nullable: false})
    age: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    cedula: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    phone?: string;

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if (!this.password){
            return;
        }
        this.password = await hash(this.password, 10);
    }


    @OneToMany((type) => Order, (order) => order.bought_by)
    orders: Order[];

    
    @OneToMany((type) => Sale, (sale) => sale.delivery_man)
    delivery_man: Sale[];
	@OneToMany((type) => Sale, (sale) => sale.user)
    sales: Sale[];
    
}