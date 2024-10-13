import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class LoginService {
    constructor(private prismaService: PrismaService) { }

    login = async (data: { username: string, password: string }): Promise<User> => {
        const user = await this.prismaService.user.findUnique({
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

}
