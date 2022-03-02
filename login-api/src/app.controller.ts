import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/version')
  async login() {
    return {
      version: '1.1.1',
    };
  }

  @Get('/enviromnets')
  async enviromnets() {
    return {
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    };
  }
}
