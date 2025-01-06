import { Module } from '@nestjs/common';
import { UserSkillService } from './user-skill.service';
import { UserSkillController } from './user-skill.controller';

@Module({
  controllers: [UserSkillController],
  providers: [UserSkillService],
})
export class UserSkillModule {}
