import { Body, Controller, Post, Request, Response, UseGuards, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from 'src/utils/local.guard';
import { GetUser } from 'src/utils/get-user.decorator';
import { LoginDTO } from 'src/login/dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDTO: LoginDTO, @Response() res) {
        const user = await this.authService.validateUser(loginDTO);
        if (!user) {
            //error handling
        }
        return user;
    }

    @UseGuards(LocalGuard)
    @Post('test')
    async test(@GetUser() user) {
        return user;
    }

    @UseGuards(LocalGuard)
    @Post('logout')
    async logout(@Request() req, @Response() res) {
        return { message: 'Logged out' };
    }
}
