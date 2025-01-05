import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateResumeDto {
    @IsInt()
    @IsNotEmpty()
    user_id: number //id of user table

    @IsString()
    @IsNotEmpty()
    resume_file: string
}
