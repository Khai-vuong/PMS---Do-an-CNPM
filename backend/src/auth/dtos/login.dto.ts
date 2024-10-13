import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    @IsString()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}