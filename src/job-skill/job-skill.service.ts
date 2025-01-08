import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobSkillDto } from './dto/create-job-skill.dto';
import { UpdateJobSkillDto } from './dto/update-job-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSkill } from './entities/job-skill.entity';
import { Repository } from 'typeorm';
import { Job } from 'src/jobs/entities/job.entity';
import { Skill } from 'src/skills/entities/skill.entity';

@Injectable()
export class JobSkillService {
  constructor(
    @InjectRepository(JobSkill)
    private jobSkillRepository: Repository<JobSkill>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>
  ) { }


  async create(createJobSkillDto: CreateJobSkillDto): Promise<JobSkill> {
    const jobs = await this.jobRepository.findOne({ where: { job_id: createJobSkillDto.job_id } });
    if (!jobs) {
      throw new NotFoundException('job not found');
    }

    const skills = await this.skillRepository.findOne({ where: { id: createJobSkillDto.skill_id } });
    if (!skills) {
      throw new NotFoundException('skills not found');
    }

    const jobSkillData = this.jobSkillRepository.create({
      ...createJobSkillDto,
      job: jobs,
      skill: skills
    })

    return this.jobSkillRepository.save(jobSkillData);
  }

  async findAll(): Promise<JobSkill[]> {
    return this.jobSkillRepository.find({ relations: ['job', 'skill'] })
  }

  async findOne(job_skill_id: number): Promise<JobSkill> {
    const avaialbeJobSkill = this.jobSkillRepository.findOne({ where: { job_skill_id } });
    if (!avaialbeJobSkill) {
      throw new NotFoundException('job skill not found');
    }
    return avaialbeJobSkill;
  }

  //update function

  async update(job_skill_id: number, updateJobSkillDto: UpdateJobSkillDto): Promise<JobSkill> {
    const jobsAvailable = await this.jobRepository.findOne({ where: { job_id: updateJobSkillDto.job_id } });
    if (!jobsAvailable) {
      throw new NotFoundException('job not found');
    }

    const skillsAvailable = await this.skillRepository.findOne({ where: { id: updateJobSkillDto.skill_id } });
    if (!skillsAvailable) {
      throw new NotFoundException('skills not found');
    }

    const jobSkillAvailable = await this.jobSkillRepository.findOne({ where: { job_skill_id } });
    if (!jobSkillAvailable) {
      throw new NotFoundException('skills not found');
    }

    const updatedJobSkillData = this.jobSkillRepository.create({
      job: jobsAvailable,
      skill: skillsAvailable,
      ...updateJobSkillDto
    })

    return this.jobSkillRepository.save(updatedJobSkillData);
  }

  //delete function
  async remove(job_skill_id: number): Promise<void> {
    const jobSkillAvailable = await this.jobSkillRepository.findOne({ where: { job_skill_id } });
    if (!jobSkillAvailable) {
      throw new NotFoundException('skills not found');
    }
    await this.jobSkillRepository.remove(jobSkillAvailable);
  }
}
