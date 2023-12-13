import {
  Ctx,
  Hears,
  Message,
  On,
  Start,
  Update
} from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class AppUpdate {

 

    @Start()
    async start(@Ctx() ctx : Context) {
      await ctx.reply('Wellcome!');
    }
    @On('text')
    async onText(@Ctx() ctx: Context) {
      const messageText = 'Hello, user! This is your NestJS Telegraf bot.';
      await ctx.reply(messageText);
  
    }
    
}   