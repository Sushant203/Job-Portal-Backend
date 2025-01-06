import { Module } from '@nestjs/common';
import { UserSkillService } from './user-skill.service';
import { UserSkillController } from './user-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSkill } from './entities/user-skill.entity';
import { User } from 'src/user/entity/users.entity';
import { Skill } from 'src/skills/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSkill, User, Skill])],
  controllers: [UserSkillController],
  providers: [UserSkillService],
})
export class UserSkillModule { }
