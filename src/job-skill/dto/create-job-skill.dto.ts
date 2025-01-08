import { IsInt } from "class-validator";

export class CreateJobSkillDto {
    @IsInt()
    job_id: number

    @IsInt()
    skill_id: number

}
