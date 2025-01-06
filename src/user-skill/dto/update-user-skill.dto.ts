import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSkillDto } from './create-user-skill.dto';

export class UpdateUserSkillDto extends PartialType(CreateUserSkillDto) {}
