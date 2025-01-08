import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/users.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
  async create(createJobDto: CreateJobDto): Promise<Job> {
    const user = await this.userRepository.findOne({ where: { id: createJobDto.user_id } });
    if (!user) {
      throw new NotFoundException(`user id not found.`);
    }
    const job = await this.jobRepository.create({
      user: user,
      ...createJobDto
    })
    return this.jobRepository.save(job);
  }

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find({ relations: ['user'] })
  }

  async findOne(job_id: number): Promise<Job> {
    const result = await this.jobRepository.findOne({ where: { job_id } });
    if (!result) {
      throw new NotFoundException(`job with ${job_id} not found`);
    }
    return result;
  }

  async update(job_id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    const jobs = await this.jobRepository.findOne({ where: { job_id } });
    if (!jobs) {
      throw new NotFoundException(`job with ${job_id} not found`);
    }
    const users = await this.userRepository.findOne({ where: { id: updateJobDto.user_id } });
    if (!users) {
      throw new NotFoundException('user not found');
    }
    const updatedJob = await this.jobRepository.create({
      ...jobs,
      ...updateJobDto,
      user: users,
    })
    return this.jobRepository.save(updatedJob);
  }

  async remove(job_id: number): Promise<void> {
    const job = await this.jobRepository.findOne({ where: { job_id: job_id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${job_id} not found.`);
    }
    await this.jobRepository.remove(job);
  }

}
