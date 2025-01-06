import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { applicationStatus } from "../dto/applicationStatus";
import { User } from "src/user/entity/users.entity";
import { Job } from "src/jobs/entities/job.entity";

export class Application {
    @PrimaryGeneratedColumn()
    application_id: number

    @Column()
    user_id: number

    @Column()
    job_id: number

    @Column()
    application_date: string

    @Column({ type: 'enum', enum: applicationStatus })
    status: applicationStatus

    //relation establishment
    @ManyToOne(() => User, (user) => user.application)
    user: User

    //relation with job table
    @ManyToOne(() => Job, (job) => job.application)
    job: Job
}
