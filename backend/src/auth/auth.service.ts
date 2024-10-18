import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

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

    // async signup(username: string, password: string): Promise<any> {
    //     const user = await this.prisma.user.create({
    //         data: {
    //             username,
    //             password,
    //         },
    //     });
    //     return user;
    // }
}
