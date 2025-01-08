import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';
import { User } from 'src/user/entity/users.entity';
import { Application } from 'src/applications/entities/application.entity';
import { JobSkill } from 'src/job-skill/entities/job-skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, User, Application, JobSkill])], // Ensure this is included
  controllers: [JobsController],
  providers: [JobsService],

})
export class JobsModule { }
