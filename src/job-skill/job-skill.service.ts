import { Injectable } from '@nestjs/common';
import { CreateJobSkillDto } from './dto/create-job-skill.dto';
import { UpdateJobSkillDto } from './dto/update-job-skill.dto';

@Injectable()
export class JobSkillService {
  create(createJobSkillDto: CreateJobSkillDto) {
    return 'This action adds a new jobSkill';
  }

  findAll() {
    return `This action returns all jobSkill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobSkill`;
  }

  update(id: number, updateJobSkillDto: UpdateJobSkillDto) {
    return `This action updates a #${id} jobSkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobSkill`;
  }
}
