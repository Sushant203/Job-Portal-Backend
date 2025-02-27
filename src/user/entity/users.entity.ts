import { application } from 'express';
import { Application } from 'src/applications/entities/application.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { UserSkill } from 'src/user-skill/entities/user-skill.entity';
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

    //realtion with resume table
    @OneToMany(() => Resume, (resume) => resume.user)
    resume: Resume
    //relation for jobs
    @OneToMany(() => Job, (job) => job.user)
    job: Job

    //realtion with application table
    @OneToMany(() => Application, (application) => application.user_id)
    application: Application

    //relation with user skill table
    @OneToMany(() => UserSkill, (user_skill) => user_skill.user_id)
    user_skill: UserSkill
}
