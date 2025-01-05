import { IsEnum, IsNumber, IsString, IsEmail, MinLength, MaxLength } from "class-validator";

enum roles {
    admin = 'admin',
    jobSeeker = 'jobSeeker',
    employer = 'employer',
}

export class createUserDTO {
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @IsNumber()
    phone_number: number;

    @IsEnum(roles)
    role: roles;
}
