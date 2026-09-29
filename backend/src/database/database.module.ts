import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Order } from '../order/entities/order.entity';
import { OrderTicket } from '../order/entities/order-ticket.entity';

import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        type: 'postgres',

        host: 'localhost',
        port: 5432,

        database: 'films',

        username: config.get<string>('DATABASE_USERNAME'),

        password: config.get<string>('DATABASE_PASSWORD'),

        entities: [Film, Schedule, Order, OrderTicket],

        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
