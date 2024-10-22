import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LoginDTO } from 'src/login/dtos/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    // constructor(private authService: AuthService) {
    //     super();
    // }

    // async validate(username: string, password: string): Promise<any> {
    //     console.log('LocalStrategy');

    //     const user = await this.authService.validateUser({ username, password });
    //     if (!user) {
    //         throw new UnauthorizedException();
    //     }
    //     return user;
    // }

}