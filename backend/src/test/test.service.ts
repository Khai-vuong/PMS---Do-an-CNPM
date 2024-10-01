import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TestService {

    constructor(private prisma: PrismaService) { }

    async uploadNigga() {
        const mockUser = {
            username: 'test',
            password: '123456',
            email: 'hcmut'
        }

        await this.prisma.user.create({
            data: mockUser
        });
    }

}
