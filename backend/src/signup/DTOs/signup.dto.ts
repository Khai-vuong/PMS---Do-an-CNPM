import { IsString, IsNotEmpty } from 'class-validator';
export class Login_DTO  {
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}