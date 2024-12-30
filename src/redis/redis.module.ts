import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService], // Use 'providers' for services
  exports: [RedisService], // Export if required in other modules
})
export class RedisModule {}
