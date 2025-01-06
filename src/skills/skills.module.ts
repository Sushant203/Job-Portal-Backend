import { Module } from '@nestjs/common';
import { skillservice } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skill } from './entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSkill } from 'src/user-skill/entities/user-skill.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Skill, UserSkill])],
  controllers: [SkillsController],
  providers: [skillservice],
})
export class SkillsModule { }
