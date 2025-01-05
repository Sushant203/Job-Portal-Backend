import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class skillservice {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>
  ) { }

  // Create a new skill
  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(createSkillDto);
    return this.skillRepository.save(skill);
  }

  // Retrieve all skill
  async findAll(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  // Retrieve a single skill by ID
  async findOne(id: number): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found.`);
    }
    return skill;
  }

  // Update a skill by ID
  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(id); // Ensure skill exists
    Object.assign(skill, updateSkillDto); // Update properties
    return this.skillRepository.save(skill);
  }

  // Delete a skill by ID
  async delete(id: number): Promise<DeleteResult> {
    const result = await this.skillRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Skill with ID ${id} not found.`);
    }
    return result;
  }
}
