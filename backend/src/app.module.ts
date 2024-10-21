import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { SignupModule } from './signup/signup.module';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    TestModule,
    LoginModule,
    AuthModule,
    SignupModule,
    PassportModule.register({ session: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
