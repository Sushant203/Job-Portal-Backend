import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/user/entity/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserSkill {
    @PrimaryGeneratedColumn()
    user_skill_id: number

    @Column()
    user_id: number

    @Column()
    skill_id: number

    @ManyToOne(() => User, (user) => user.user_skill)
    user: User

    // relation with skill table
    @ManyToOne(() => Skill, (skill) => skill.user_skill)
    skill: Skill
}
