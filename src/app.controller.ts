import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getCurrentUrl(@Req() req: Request): string {
    const protocol = req.protocol; // 'http' or 'https'
    const host = req.get('host');  // 'localhost:3000' or 'your-railway-url.com'
    const currentUrl = `${protocol}://${host}${req.originalUrl}`;
    return `Current URL is: ${currentUrl}`;
  }
}
