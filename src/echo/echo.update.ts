import {
    Hears,
    Message,
    On,
    Sender ,
    Update, Ctx, Start
} from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class AppUpdate {
    @Hears(/hi/)
    onMessage(@Message('text') reversedText: string) {
        return reversedText;
    }

 

    @Start()
    async start(@Ctx() ctx : Context) {
        this.onMessage('text')
      await ctx.reply('Welcome');
      await ctx.reply('Welcome');   
    }
    // @On('text')
    async onText(@Ctx() ctx: Context) {
      const userId = 2081782581;
      const messageText = 'Hello, user! This is your NestJS Telegraf bot.';
  
      // Send a message to the specified user ID
      await ctx.telegram.sendMessage(userId, messageText);
  
      // You can also use ctx.reply for shorthand
      // await ctx.reply(messageText);
    }
    
}   