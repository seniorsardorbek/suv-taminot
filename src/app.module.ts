import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessionMiddleware } from './session.middleware';
import { AppUpdate } from './echo/echo.update';
import { Telegraf } from 'telegraf';
import { TelegrafService } from './telegraf.service';
import config from './shared/config';

@Module({
  imports: [AppUpdate ,ScheduleModule.forRoot(), HttpModule ,   TelegrafModule.forRoot({
    token: config.token,
    middlewares:[sessionMiddleware],
    include: [],
  }),],
  controllers: [AppController],
  providers: [AppService , AppUpdate , Telegraf , TelegrafService],
})
export class AppModule {}
