import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { TelegrafService } from './telegraf.service';

const codes = [
  'vea0dex6t',
  'rt2ze048k',
  'mzwagf8k',
  'lwm0lmjz',
  'wah7z2n3l',
  'tlcttgd',
  'zu9bkie9e',
  'di3jl0wk',
  'rpojasomh',
  'naxpyp1yq',
  '7ztq9s9fk',
  'gv0n0q3jj',
  'fuj1fme2',
  'ta9y8d6bm',
  'b4pb0uf68',
  't3bqyvlqt',
  'gec7jov2n',
  '6t6q4i0ci',
  '78h419msn',
  'stpcaawqa',
  '2ttgavaln',
  'vwcb9qhy',
  '4dq4crunq',
  '52oe6k0yj',
  'ndc964w0s',
  'x7x5lya4',
  '1bcgxosrm',
  'liffoc15',
  'uu71qcyrq',
  '47x6z2sd2',
  'ob5jif06qe'
]
@Injectable()
export class AppService {
  constructor(private httpService: HttpService, private readonly telegrafService: TelegrafService) { }

  getHello(): string {
    codes.map((el) => {
      return  this.fetchData(el)
     })
    return 'Hello World!';
  }

  async fetchData(id: string): Promise<any> {
    const url = 'http://89.236.195.198:2010';
    const data = {
      code: id,
      data: {
        level: this.generateRandomNumber(1, 9),
        volume: this.generateRandomNumber(1, 9),
        vaqt: this.getCurrentDateTime()
      }
    }
    const response: AxiosResponse = await this.httpService.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).toPromise();
     
    const template = `
      CompanyId: ${id} ,
      Level: ${data.data.level}
      Volume: ${data.data.volume}
      Vaqt: ${data.data.vaqt}`
    
    if (response.data.status === 'success') {
      this.telegrafService.sendMessageToUser(`
      Status : Success
      Message: ${response.data.message},
      ${template}`)

    } else if (response.data.status === 'error') {
      this.telegrafService.sendMessageToUser(`
      Status : Error
      Message: ${response.data.message},
      ${template}`)
    }
    return response.data
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    try {
      codes.map((el) => {
       return  this.fetchData(el)
      })
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
