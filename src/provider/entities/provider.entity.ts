import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity('provider')
export class Provider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    email?: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    address: string;

    // @Column({ type: 'varchar', length: 50, nullable: false })
    // cedula: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    phone?: string;
    
    @Column({ type: 'varchar', length: 50, nullable: true })
    phone2?: string;
        
    // @OneToMany((type) => Sale, (sale) => sale.provider)
    // sales: Sale[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}