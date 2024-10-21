import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { LoginModule } from './login/login.module';
import { LobbyModule } from './lobby/lobby.module';

@Module({
  imports: [TestModule, LoginModule, LobbyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
