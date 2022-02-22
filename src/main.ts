import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Guard } from './auth.guard';
import { LoggerService } from './core/logger/logger.service';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.enableCors();

  const logger: LoggerService = app.get(LoggerService);
  // app.useGlobalGuards(new Guard(logger));

  const port: number = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
