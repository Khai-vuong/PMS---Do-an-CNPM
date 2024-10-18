import { Body, Controller, Post, Request, UseGuards, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from 'src/utils/local.guard';
import { GetUser } from 'src/utils/get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(
        @Body() input: { username: string, password: string },
        @Request() req: any,
        @Session() session: Record<string, any>) {
        const user = await this.authService.validateUser(input.username, input.password);

        if (user) {
            session.authenticated = true;
            req.user = user;
            console.log('/auth');
            console.log(req.user);
            return req.user;
        }

        else {
            session.authenticated = false;
            return { message: "Invalid credentials" };
        }
    }

    // @Post('signup')
    // async signup(@Body() input: { username: string, password: string }) {
    //     const user = await this.authService.createUser(input.username, input.password);
    //     return user;
    // }

    @UseGuards(LocalGuard)
    @Post('test')
    async getUser(
        @GetUser() user: any,
        @Body() input: { username: string, password: string }) {
        console.log("get user test");
        console.log(user);
        return user;
    }

    @UseGuards(LocalGuard)
    @Post('logout')
    async logout(@Request() req: any, @Session() session: Record<string, any>) {
        session.authenticated = false;
        req.session.destroy();
        req.user = null;
        return { message: "Logged out" };
    }

}
