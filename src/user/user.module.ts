import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { Application } from 'src/applications/entities/application.entity';
import { UserSkill } from 'src/user-skill/entities/user-skill.entity';
import { JobSkill } from 'src/job-skill/entities/job-skill.entity';
@Module({
    imports: [TypeOrmModule.forFeature([User, Resume, Job, Application, UserSkill, JobSkill])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
