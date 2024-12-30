import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private pubClient: any;
  private subClient: any;

  async onModuleInit() {

    this.pubClient = createClient({
        socket: {
          host: 'redis-14156.c91.us-east-1-3.ec2.redns.redis-cloud.com', // Replace with your Redis host
          port: 14156, // Replace with your Redis port
          connectTimeout: 10000
        },
        username: 'default', // Optional if Redis ACL is enabled
        password: 'mFCFtJe34soC1XJx5nTXijP1hY2IPcDR', // Replace with your Redis password
      });
    this.subClient = this.pubClient.duplicate();

    await Promise.all([this.pubClient.connect(), this.subClient.connect()]);
    console.log('Redis clients connected.');
  }

  getPubClient() {
    return this.pubClient;
  }

  getSubClient() {
    return this.subClient;
  }

  async publish(channel: string, message: any) {
    await this.pubClient.publish(channel, JSON.stringify(message));
  }

  async subscribe(channel: string, callback: (message: any) => void) {
    await this.subClient.subscribe(channel, (message) => {
      callback(JSON.parse(message));
    });
  }
}
