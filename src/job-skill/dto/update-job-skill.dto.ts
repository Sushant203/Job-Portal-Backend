import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSkillDto } from './create-job-skill.dto';

export class UpdateJobSkillDto extends PartialType(CreateJobSkillDto) {}
