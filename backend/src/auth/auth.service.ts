import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {

        const user = await this.prismaService.user.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            throw new UnauthorizedException({ message: "Account is not exist" });
        }
        // tuong lai co the them bcrypt cho nay
        const verifyPassword = pass === user.password;
        if (!verifyPassword) {
            throw new UnauthorizedException({ message: "Password is incorrect" });
        }

        const { password, ...result } = user;
        return result;

    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.uid };
        return {
            access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY }),
        };
    }
}
