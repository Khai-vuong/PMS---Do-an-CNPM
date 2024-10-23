import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { LocalStrategy } from 'src/utils/local.strategy';
// import { SessionSerializer } from 'src/utils/session.serializer';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: 'secretKey',
    signOptions: { expiresIn: '300s' },
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy]
})
export class AuthModule { }
