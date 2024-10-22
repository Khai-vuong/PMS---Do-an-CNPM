import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDTO } from 'src/login/dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }

    //Copied logic from Tuan
    async validateUser(data: LoginDTO): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                username: data.username
            }
        });

        if (!user) {
            throw new HttpException({ message: "Account is not exist" }, HttpStatus.UNAUTHORIZED)
        }

        const verifyPassword = data.password === user.password

        if (!verifyPassword) {
            throw new HttpException({ message: "Password is incorrect" }, HttpStatus.UNAUTHORIZED)
        }

        return user;
    }

    //Copied from Son
    async signup(createUser: LoginDTO): Promise<User> {
        const existedUser = await this.prisma.user.findUnique({ where: { username: createUser.username } });
        if (existedUser) {
            throw new NotFoundException("Username already exists");
        }
        return this.prisma.user.create({
            data: {
                username: createUser.username,
                password: createUser.password,
                email: ""
            },
        });
    }

    isAuthenticated(request: any): boolean {
        return !!request.user;
    }
}
