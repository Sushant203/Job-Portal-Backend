import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { User } from 'src/user/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resume, User])],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule { }
