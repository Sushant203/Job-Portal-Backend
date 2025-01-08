import { Job } from "src/jobs/entities/job.entity";
import { Skill } from "src/skills/entities/skill.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class JobSkill {
    @PrimaryGeneratedColumn()
    job_skill_id: number

    @Column()
    job_id: number

    @Column()
    skill_id: number

    //relation with job column
    @ManyToOne(() => Job, (job) => job.job_skill)
    job: Job

    //relation with skill table
    @ManyToOne(() => Skill, (skill) => skill.job_skill)
    skill: Skill
}
