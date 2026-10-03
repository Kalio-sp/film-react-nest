import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'dotenv/config';

import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  let logger;

  switch (process.env.LOGGER_TYPE) {
    case 'json':
      logger = new JsonLogger();
      break;

    case 'tskv':
      logger = new TskvLogger();
      break;

    default:
      logger = new DevLogger();
  }

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix('api/afisha');

  app.enableCors();

  app.useLogger(logger);

  await app.listen(Number(process.env.PORT) || 3000);
}

bootstrap();
