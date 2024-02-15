import { Column, CreateDateColumn,UpdateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity('password_recovery')
export class PasswordRecovery{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    code:string;

    @Column({type: 'boolean', nullable: true, default: false})
    IsInvalid:boolean;

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updateAt?: Date;

    @ManyToOne(type => User, (user) => user.resetCode, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: "user_id"})
    user: User;
    
}