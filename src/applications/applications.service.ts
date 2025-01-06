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
      job: jobAvaiable,
      ...createApplicationDto,
    })
    return this.applicationRepository.save(applicationData);
  }


  async findAll(): Promise<Application[]> {
    return this.applicationRepository.find({ relations: ['user', 'job'] });
  }

  async findOne(application_id: number): Promise<Application> {
    const result = this.applicationRepository.findOne({ where: { application_id } })
    if (!result) {
      throw new NotFoundException(`application ${application_id} not found`);
    }
    return result;
  }

  async update(application_id: number, updateApplicationDto: UpdateApplicationDto): Promise<Application> {
    //check user avaialbility
    const userAvailabe = await this.userRepository.findOne({ where: { id: updateApplicationDto.user_id } });
    if (!userAvailabe) {
      throw new NotFoundException(`user id not found`);
    }
    //check job avaialbility
    const jobs = await this.jobRepository.findOne({ where: { job_id: updateApplicationDto.job_id } });
    if (!jobs) {
      throw new NotFoundException(`job not found`);

    }
    //check application avaialbility
    const applicationAvailable = await this.applicationRepository.findOne({ where: { application_id } });
    if (!applicationAvailable) {
      throw new NotFoundException(`application not found`);
    }

    const updatedApplication = this.applicationRepository.create({
      ...updateApplicationDto,
      user: userAvailabe,
      job: jobs,
    })
    return this.applicationRepository.save(updatedApplication);
  }

  async remove(application_id: number): Promise<void> {
    const applicationAvailable = await this.applicationRepository.findOne({ where: { application_id } });
    if (!applicationAvailable) {
      throw new NotFoundException(`application not found`);
    }
    await this.applicationRepository.remove(applicationAvailable);
  }
}
