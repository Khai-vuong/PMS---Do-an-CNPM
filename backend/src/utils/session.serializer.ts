// auth/session.serializer.ts
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private prisma: PrismaService) {
        super();
    }

    // Store only the user ID in the session
    async serializeUser(user: any, done: Function) {
        done(null, user.uid);
    }

    // Fetch the full user object from the database based on the ID in the session
    async deserializeUser(uid: string, done: Function) {
        const user = await this.prisma.user.findUnique({ where: { uid } });
        if (!user) return done(null, null);
        done(null, user);
    }

}
