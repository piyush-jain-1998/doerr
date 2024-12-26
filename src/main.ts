import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Make sure the WebSocket server uses the correct port
  const port = process.env.PORT || 3000;

  // Enable WebSocket support with a default adapter
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(port);
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'; // assuming it's using HTTPS in production
  const host = process.env.HOST || 'localhost'; // you can use the host from the environment variables or fallback to localhost

  console.log(`Server started on ${protocol}://${host}:${port}`);
  }

bootstrap();
