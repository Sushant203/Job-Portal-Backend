import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
@Module({
    imports: [TypeOrmModule.forFeature([User, Resume])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
