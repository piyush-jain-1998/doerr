import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS globally
  await app.listen(3100);
  console.log('Application is running on http://localhost:3100');
}
bootstrap();
