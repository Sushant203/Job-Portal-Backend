import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/users.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>
  ) { }

  async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
    //check if the user with particular id is avain=lable or not
    const users = await this.userRepository.findOne({ where: { id: createApplicationDto.user_id } })
    if (!users) {
      throw new NotFoundException("user not found");
    }
    //check if the job with particular id is available or not 

    const jobAvaiable = await this.jobRepository.findOne({ where: { job_id: createApplicationDto.job_id } });
    if (!jobAvaiable) {
      throw new NotFoundException(`job not found`);
    }

    const applicationData = await this.applicationRepository.create({
      user: users,
      ...Job,
      ...createApplicationDto,
    })
    return this.applicationRepository.save(applicationData);
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
