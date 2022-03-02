import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/version')
  async login() {
    return {
      version: '1.1.0',
    };
  }
}
