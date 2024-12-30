import { Module, OnModuleInit } from '@nestjs/common';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  providers:[WebsocketsModule]
})
export class AppModule {
}
