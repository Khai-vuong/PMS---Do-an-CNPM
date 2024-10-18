import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDTO } from 'src/login/dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }

    //Change logic from Tuan
    async validateUser(username: string, password: string): Promise<any> {

        const user = await this.prisma.user.findUnique({
            where: { username },
        });

        if (user && user.password === password) {
            return user;
        }
        return null;
    }

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
}
