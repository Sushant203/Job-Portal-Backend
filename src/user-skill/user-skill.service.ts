import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSkill } from './entities/user-skill.entity';
import { Repository } from 'typeorm';
import { Skill } from 'src/skills/entities/skill.entity';
import { User } from 'src/user/entity/users.entity';

@Injectable()
export class UserSkillService {
  constructor(
    @InjectRepository(UserSkill)
    private userSkillRepository: Repository<UserSkill>,

    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }


  async create(createUserSkillDto: CreateUserSkillDto): Promise<UserSkill> {
    const users = await this.userRepository.findOne({ where: { id: createUserSkillDto.user_id } });
    if (!users) {
      throw new NotFoundException('user not found');
    }

    const skills = await this.skillRepository.findOne({ where: { id: createUserSkillDto.skill_id } });
    if (!skills) {
      throw new NotFoundException('skill not found');
    }

    const userSkills = this.userSkillRepository.create({
      user: users,
      skill: skills,
      ...createUserSkillDto
    });
    return this.userSkillRepository.save(userSkills);
  }

  async findAll(): Promise<UserSkill[]> {
    return this.userSkillRepository.find({ relations: ['user', 'skill'] });
  }

  async findOne(user_skill_id: number) {
    const result = this.userSkillRepository.findOne({ where: { user_skill_id } });
    if (!result) {
      throw new NotFoundException(`application ${user_skill_id} not found`);
    }
    return result;
  }

  update(id: number, updateUserSkillDto: UpdateUserSkillDto) {
    return `This action updates a #${id} userSkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSkill`;
  }
}
