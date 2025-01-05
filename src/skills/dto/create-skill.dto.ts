import { IsString } from "class-validator";

export class CreateSkillDto {
    @IsString()
    skill_name: string
}
