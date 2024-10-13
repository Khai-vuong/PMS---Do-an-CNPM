import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { Login_DTO } from './DTOs/signup.dto';

@Injectable()
export class SignupService {
    constructor (private prisma: PrismaService) {};
    async signup(createUser: Login_DTO): Promise<User> {
        const existedUser = await this.prisma.user.findUnique({ where: { username: createUser.username } });
        if (existedUser) {
            throw new NotFoundException("Username already exists");
        }
        return this.prisma.user.create({ data: {
            username: createUser.username,
            password: createUser.password,
            email: ""
        }, });
    }
}
