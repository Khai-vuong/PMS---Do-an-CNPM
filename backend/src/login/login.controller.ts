import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDTO } from './dtos/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private loginService: LoginService) { }

    @Post('login')
    login(@Body() body: LoginDTO): Promise<User> {
        return this.loginService.login(body)
    }

}
