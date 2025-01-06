import { Job } from 'src/jobs/entities/job.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

enum roles {
    admin = 'admin',
    jobSeeker = 'jobSeeker',
    employer = 'employer',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phone_number: number;

    @Column({ type: 'enum', enum: roles })
    role: roles;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => Resume, (resume) => resume.user)
    resume: Resume
    //relation for jobs
    @OneToMany(() => Job, (job) => job.user)
    job: Job
}
