import { IsDateString, IsEnum, IsInt } from "class-validator";
import { applicationStatus } from "./applicationStatus";

export class CreateApplicationDto {
    @IsInt()
    user_id: number

    @IsInt()
    job_id: number

    @IsDateString()
    application_date: string

    @IsEnum({ applicationStatus })
    status: applicationStatus
}
