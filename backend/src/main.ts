import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createClient } from 'redis';
import * as session from 'express-session';
import * as passport from 'passport';
import * as RedisStore from 'connect-redis';
import * as pgSession from 'connect-pg-simple';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const redisClient = createClient();
  // await redisClient.connect();

  // const redisStore = RedisStore(session);


  app.enableCors({
    origin: 'http://localhost:5173', // Or your frontend URL
    credentials: true, // Allow credentials (cookies)
  });

  const PgStore = pgSession(session);

  app.use(
    session({
      store: new PgStore({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
      }),
      secret: 'TRUONGDAIHOCKYTHUATHANGDAUMIENNAM',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60 * 60 * 1000 }, //1 hour
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(4000); //must be at last line}
}
bootstrap();

