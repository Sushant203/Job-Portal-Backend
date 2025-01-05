import { User } from "src/user/entity/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Resume {
    @PrimaryGeneratedColumn()
    resume_id: number

    @Column()
    user_id: number

    @Column()
    resume_file: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
    //relation
    @ManyToOne(() => User, (user) => user.resume)
    user: User;
}

