import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'TRUONGDAIHOCKYTHUATHANGDAUMIENNAM',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 100000 }, // 60 sec
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(4000); //must be at last line}
}
bootstrap();

