import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { Order } from '../order/entities/order.entity';
import { OrderTicket } from '../order/entities/order-ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        type: config.get<any>('DATABASE_DRIVER') || 'postgres',

        url: config.get<string>('DATABASE_URL'),

        host: config.get<string>('DATABASE_HOST'),

        port: Number(config.get<string>('DATABASE_PORT')),

        database: config.get<string>('DATABASE_NAME'),

        username: config.get<string>('DATABASE_USERNAME'),

        password: config.get<string>('DATABASE_PASSWORD'),

        entities: [Film, Schedule, Order, OrderTicket],

        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
