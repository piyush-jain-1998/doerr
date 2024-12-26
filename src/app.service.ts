import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public value  = "";
  getHello(): string {
    return 'Hello World!';
  }

}

