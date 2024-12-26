import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public value  = "";
  getHello(): string {
    return this.value;
  }
  setHello(data): string {
    this.value = data; 
    return 'Hello World!';
  }

}

