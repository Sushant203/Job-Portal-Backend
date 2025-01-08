import { Module } from '@nestjs/common';
import { JobSkillService } from './job-skill.service';
import { JobSkillController } from './job-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSkill } from './entities/job-skill.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { Skill } from 'src/skills/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobSkill, Job, Skill])],
  controllers: [JobSkillController],
  providers: [JobSkillService],
})
export class JobSkillModule { }
