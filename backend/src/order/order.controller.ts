import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @Get()
  getOrders(@Query('email') email: string) {
    return this.orderService.getOrders(email);
  }
}
