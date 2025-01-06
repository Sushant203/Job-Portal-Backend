import { IsDateString, IsDecimal, IsEnum, IsInt, IsString } from "class-validator";
import { employmentType } from "./employmentEnum";
import { NumericType } from "typeorm";
import { statusEnum } from "./statusEnum";

export class CreateJobDto {
    @IsInt()
    user_id: number

    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    location: string

    @IsEnum({ employmentType })
    employmentType: employmentType

    @IsDecimal()
    salary_range: NumericType

    @IsDateString()
    application_deadline: string

    @IsEnum({ statusEnum })
    status: statusEnum
}
