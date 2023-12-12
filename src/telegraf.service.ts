import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import config from './shared/config';

@Injectable()
export class TelegrafService {
  private readonly bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(config.token);
  }

  async sendMessageToUser( message: string) {
    await this.bot.telegram.sendMessage(config.chatId, message);
  }
}
