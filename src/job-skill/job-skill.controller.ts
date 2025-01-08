import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobSkillService } from './job-skill.service';
import { CreateJobSkillDto } from './dto/create-job-skill.dto';
import { UpdateJobSkillDto } from './dto/update-job-skill.dto';

@Controller('job-skill')
export class JobSkillController {
  constructor(private readonly jobSkillService: JobSkillService) {}

  @Post()
  create(@Body() createJobSkillDto: CreateJobSkillDto) {
    return this.jobSkillService.create(createJobSkillDto);
  }

  @Get()
  findAll() {
    return this.jobSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobSkillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobSkillDto: UpdateJobSkillDto) {
    return this.jobSkillService.update(+id, updateJobSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobSkillService.remove(+id);
  }
}
