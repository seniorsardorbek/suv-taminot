import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, Start, TelegrafContextType, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
@Controller()
@Update()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return  this.appService.getHello();
  }
 
}
