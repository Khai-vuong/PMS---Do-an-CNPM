import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [TestModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
