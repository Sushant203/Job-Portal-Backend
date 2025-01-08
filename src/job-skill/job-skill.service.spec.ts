import { Test, TestingModule } from '@nestjs/testing';
import { JobSkillService } from './job-skill.service';

describe('JobSkillService', () => {
  let service: JobSkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobSkillService],
    }).compile();

    service = module.get<JobSkillService>(JobSkillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
