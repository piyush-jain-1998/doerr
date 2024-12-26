import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapModule } from './map/map.module';
import { LocationGateway } from './location/location.gateway';
import { WebsocketsModule } from './websockets/websockets.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [MapModule, WebsocketsModule],
  controllers: [AppController],
  providers: [AppService, LocationGateway],
})
export class AppModule {}



