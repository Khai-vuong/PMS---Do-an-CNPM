import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
    @IsString()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}