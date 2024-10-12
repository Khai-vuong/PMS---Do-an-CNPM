import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Login_DTO } from './DTOs/signup.dto';
import { SignupService } from './signup.service';
@Controller('signup')
export class SignupController {
    constructor(private readonly signupService: SignupService) {};
    @Post() //POST /signup
    async signup(@Body(ValidationPipe) user: Login_DTO) {
        return this.signupService.signup(user);
    }
}
