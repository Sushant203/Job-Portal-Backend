import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';
import { User } from 'src/user/entity/users.entity';
import { Application } from 'src/applications/entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, User, Application])], // Ensure this is included
  controllers: [JobsController],
  providers: [JobsService],

})
export class JobsModule { }
