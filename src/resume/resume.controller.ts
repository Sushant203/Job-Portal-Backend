import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) { }

  @Post()
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.create(createResumeDto);
  }

  @Get()
  findAll() {
    return this.resumeService.findAll();
  }

  @Get(':resume_id')
  findOne(@Param('resume_id') resume_id: number) {
    return this.resumeService.findOne(+resume_id);
  }

  @Patch(':resume_id')
  update(@Param('resume_id') id: number, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(+id, updateResumeDto);
  }

  @Delete(':resume_id')
  delete(@Param('resume_id') resume_id: number) {
    return this.resumeService.delete(+resume_id);
  }
}
