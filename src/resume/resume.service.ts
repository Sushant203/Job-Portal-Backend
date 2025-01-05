import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Resume } from './entities/resume.entity';
import { User } from 'src/user/entity/users.entity';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private ResumeRepository: Repository<Resume>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
  async create(createResumeDto: CreateResumeDto): Promise<Resume> {
    const users = await this.userRepository.findOne({ where: { id: createResumeDto.user_id } })
    console.log(users, "users ")
    if (!users) {
      throw new Error('user id not found')
    }
    const resumeData = await this.ResumeRepository.create({
      user: users,
      ...createResumeDto

    })
    return this.ResumeRepository.save(resumeData)
  }

  async findAll(): Promise<Resume[]> {
    return this.ResumeRepository.find({ relations: ['user'] });
  }

  async findOne(resume_id: number): Promise<Resume> {
    const result = await this.ResumeRepository.findOne({ where: { resume_id } });
    if (!result) {
      throw new NotFoundException(`cannot find the reusme with ${resume_id}`);
    }
    return result;
  }

  async update(resume_id: number, updateResumeDto: UpdateResumeDto): Promise<Resume> {
    const resume = await this.ResumeRepository.findOne({ where: { resume_id } })
    if (!resume) {
      throw new Error('resume id not found')
    }
    const users = await this.userRepository.findOne({ where: { id: updateResumeDto.user_id } })
    if (!users) {
      throw new Error("User id not found")
    }
    const updateResumeData = this.ResumeRepository.create({
      ...resume,
      ...updateResumeDto,
      user: users
    })
    return this.ResumeRepository.save(updateResumeData)
  }

  async delete(resume_id: number): Promise<DeleteResult> {
    const result = await this.ResumeRepository.delete(resume_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Resume with ID ${resume_id} not found.`);
    }
    return result;
  }


}

