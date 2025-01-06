import { IsInt } from "class-validator";

export class CreateUserSkillDto {
    @IsInt()
    user_id: number

    @IsInt()
    skill_id: number


}
