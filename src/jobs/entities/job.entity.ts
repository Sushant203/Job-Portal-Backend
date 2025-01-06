import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { employmentType } from "../dto/employmentEnum";
import { statusEnum } from "../dto/statusEnum";
import { User } from "src/user/entity/users.entity";
import { Application } from "src/applications/entities/application.entity";
import { application } from "express";
@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    job_id: number

    @Column()
    user_id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    location: string

    @Column({ type: 'enum', enum: employmentType })
    employment_type: employmentType

    @Column()
    salary_type: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    posted_at: Date

    @Column()
    application_deadline: string

    @Column({ type: 'enum', enum: statusEnum })
    status: statusEnum

    //reation with user table
    @ManyToOne(() => User, (user) => user.job)
    user: User

    //realtion with application table
    @OneToMany(() => Application, (application) => application.job_id)
    application: Application
}
