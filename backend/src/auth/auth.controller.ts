import { Body, Controller, Post, Request, Response, UseGuards, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from 'src/utils/local.guard';
import { GetUser } from 'src/utils/get-user.decorator';
import { LoginDTO } from 'src/login/dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(
        @Body() input: LoginDTO,
        @Request() req: any,
        @Session() session: Record<string, any>) {
        const user = await this.authService.validateUser(input);

        if (user) {
            // session.authenticated = true;
            req.user = user;
            return req.user;
        }

        else {
            // session.authenticated = false;
            return { message: "Invalid credentials" };
        }
    }

    @Post('signup')
    async signup(@Body() input: LoginDTO) {
        const user = await this.authService.signup(input);
        return user;
    }

    @UseGuards(LocalGuard)
    @Post('test')
    async getUser(
        @GetUser() user: any,
        @Body() input: { username: string, password: string }) {
        console.log("get user test");
        console.log(user);
        return user;
    }

    // @UseGuards(LocalGuard)
    // @Post('logout')
    // async logout(@Request() req: any, @Session() session: Record<string, any>) {
    //     // session.authenticated = false;
    //     req.session.destroy();
    //     req.user = null;
    //     return { message: "Logged out" };
    // }

    @UseGuards(LocalGuard)
    @Post('logout')
    async logout(@Request() req: any, @Response() res: any) {
        try {
            req.logout((err) => {
                if (err) {
                    return res.status(500).json({ message: 'Logout failed', error: err });
                }

                req.session.destroy((err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Failed to destroy session', error: err });
                    }

                    // Clear the session cookie on the client side
                    res.clearCookie('connect.sid'); // Use your session cookie name if different
                    return res.status(200).json({ message: 'Logged out successfully' });
                });
            });
        } catch (err) {
            return res.status(500).json({ message: 'An error occurred during logout', error: err });
        }
    }
}
