import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { TelegrafService } from './telegraf.service';
import config from './shared/config';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService, private readonly telegrafService: TelegrafService) { }

  getHello(): string {
    this.fetchData()
    return 'Hello World!';
  }

  async fetchData(): Promise<any> {
    const url = 'http://89.236.195.198:2010';
    const data = {
      code: config.companyID,
      data: {
        level: this.generateRandomNumber(100000, 999999),
        volume: this.generateRandomNumber(100000, 999999),
        vaqt: this.getCurrentDateTime()
      }
    }
    const response: AxiosResponse = await this.httpService.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).toPromise();

    if(response.data.status ==='success'){
      this.telegrafService.sendMessageToUser(`
      Status : Success
      Message: ${response.data.message}`)
        
    }else  if(response.data.status ==='error'){
      this.telegrafService.sendMessageToUser(`
      Status : Error
      Message: ${response.data.message}`)
    }
    return response.data
  }

  @Cron(CronExpression.EVERY_HOUR)
  handleCron() {
    try {
      this.fetchData()
    } catch (error) {
      console.log(error.message);
    }
  }

  getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}`;
  }

  generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
