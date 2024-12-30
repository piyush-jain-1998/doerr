import { Controller, Get, Req } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor() {}
  
  @EventPattern('message_channel') // Redis channel name
  handleMessage(data: any) {
    console.log('Received data:', data);
  }

  @Get()
  getCurrentUrl(@Req() req: Request): string {
    const protocol = req.protocol; // 'http' or 'https'
    const host = req.get('host');  // 'localhost:3000' or 'your-railway-url.com'
    const currentUrl = `${protocol}://${host}${req.originalUrl}`;
    return `Current URL is: ${currentUrl}`;
  }
  
}
