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

const numbers = [
  { "level": 5, "volume": 0.02 },
  { "level": 6, "volume": 0.03 },
  { "level": 7, "volume": 0.04 },
  { "level": 8, "volume": 0.05 },
  { "level": 9, "volume": 0.07 },
  { "level": 10, "volume": 0.08 },
  { "level": 11, "volume": 0.09 },
  { "level": 12, "volume": 0.10 },
  { "level": 13, "volume": 0.11 },
  { "level": 14, "volume": 0.13 },
  { "level": 15, "volume": 0.14 },
  { "level": 16, "volume": 0.16 },
  { "level": 17, "volume": 0.18 },
  { "level": 18, "volume": 0.19 },
  { "level": 19, "volume": 0.21 },
  { "level": 20, "volume": 0.22 },
  { "level": 21, "volume": 0.25 },
  { "level": 22, "volume": 0.27 },
  { "level": 23, "volume": 0.28 },
  { "level": 24, "volume": 0.30 },
  { "level": 25, "volume": 0.33 },
  { "level": 26, "volume": 0.35 },
  { "level": 27, "volume": 0.37 },
  { "level": 28, "volume": 0.39 },
  { "level": 29, "volume": 0.41 },
  { "level": 30, "volume": 0.44 },
  { "level": 31, "volume": 0.46 },
  { "level": 32, "volume": 0.48 },
  { "level": 33, "volume": 0.51 },
  { "level": 34, "volume": 0.53 },
  { "level": 35, "volume": 0.56 },
  { "level": 36, "volume": 0.58 },
  { "level": 37, "volume": 0.61 },
  { "level": 38, "volume": 0.63 },
  { "level": 39, "volume": 0.66 },
  { "level": 40, "volume": 0.69 },
  { "level": 41, "volume": 0.72 },
  { "level": 42, "volume": 0.74 },
  { "level": 43, "volume": 0.77 },
  { "level": 44, "volume": 0.80 },
  { "level": 45, "volume": 0.83 },
  { "level": 46, "volume": 0.86 },
  { "level": 47, "volume": 0.89 },
  { "level": 48, "volume": 0.92 },
  { "level": 49, "volume": 0.95 },
  { "level": 50, "volume": 0.98 },
  { "level": 51, "volume": 1.01 },
  { "level": 52, "volume": 1.04 },
  { "level": 53, "volume": 1.07 },
  { "level": 54, "volume": 1.10 },
  { "level": 55, "volume": 1.13 },
  { "level": 56, "volume": 1.16 },
  { "level": 57, "volume": 1.20 },
  { "level": 58, "volume": 1.23 },
  { "level": 59, "volume": 1.25 }
]

@Injectable()
export class AppService {
  constructor(private httpService: HttpService, private readonly telegrafService: TelegrafService) { }

  getHello(): string {
    return 'Suv Taminoti!';
  }

  async fetchData(id: string): Promise<void> {
    const { level, volume } = this.generateRandomNumber(5, 59)
    console.log(level , volume);
    const url = 'http://89.236.195.198:2010';
    const data = {
      code: id,
      data: {
        level,
        volume,
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
  }

  @Cron(CronExpression.EVERY_MINUTE)
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
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return numbers.find((el) => (el.level === random))
  }
}
