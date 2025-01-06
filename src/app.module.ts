import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { User } from "./user/entity/users.entity";
import { SkillsModule } from './skills/skills.module';
import { Skill } from "./skills/entities/skill.entity";
import { ResumeModule } from './resume/resume.module';
import { Resume } from "./resume/entities/resume.entity";
import { JobsModule } from './jobs/jobs.module';
import { Job } from "./jobs/entities/job.entity";
import { ApplicationsModule } from './applications/applications.module';
import { Application } from "./applications/entities/application.entity";
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [User, Skill, Resume, Job, Application]
  }), UserModule, SkillsModule, ResumeModule, JobsModule, ApplicationsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
