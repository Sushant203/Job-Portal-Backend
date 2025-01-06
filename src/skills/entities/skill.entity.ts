import { UserSkill } from "src/user-skill/entities/user-skill.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    skill_name: string

    //relation with user_skill table
    @OneToMany(() => UserSkill, (user_skill) => user_skill.skill)
    user_skill: UserSkill
}
