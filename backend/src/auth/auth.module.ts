import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { LocalStrategy } from 'src/utils/local.strategy';
import { SessionSerializer } from 'src/utils/session.serializer';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy, SessionSerializer]
})
export class AuthModule { }
