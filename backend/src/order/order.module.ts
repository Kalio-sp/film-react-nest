import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

import { Order } from './entities/order.entity';
import { OrderTicket } from './entities/order-ticket.entity';

import { FilmsModule } from '../films/films.module';

@Module({
  imports: [FilmsModule, TypeOrmModule.forFeature([Order, OrderTicket])],

  controllers: [OrderController],

  providers: [OrderService],
})
export class OrderModule {}
