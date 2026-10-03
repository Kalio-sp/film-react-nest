import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

import { FilmsRepository } from '../films/films.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly filmsRepository: FilmsRepository,

    private readonly dataSource: DataSource,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(orderDto: OrderDto) {
    if (!orderDto.tickets.length) {
      throw new BadRequestException('Tickets required');
    }

    const firstTicket = orderDto.tickets[0];

    const film = await this.filmsRepository.findById(firstTicket.film);

    if (!film) {
      throw new BadRequestException('Film not found');
    }

    const schedule = film.schedule.find(
      (item) => item.id === firstTicket.session,
    );

    if (!schedule) {
      throw new BadRequestException('Session not found');
    }

    const seatKeys = orderDto.tickets.map(
      (ticket) => `${ticket.row}:${ticket.seat}`,
    );

    if (new Set(seatKeys).size !== seatKeys.length) {
      throw new BadRequestException('Duplicate seats');
    }

    for (const ticket of orderDto.tickets) {
      if (
        ticket.row < 1 ||
        ticket.row > schedule.rows ||
        ticket.seat < 1 ||
        ticket.seat > schedule.seats
      ) {
        throw new BadRequestException('Invalid seat');
      }

      const key = `${ticket.row}:${ticket.seat}`;

      if (schedule.taken.includes(key)) {
        throw new BadRequestException(`Seat ${key} already taken`);
      }
    }

    const savedOrder = await this.dataSource.transaction(async (manager) => {
      schedule.taken.push(...seatKeys);

      await manager.save(schedule);

      return manager.save(Order, {
        id: randomUUID(),

        email: orderDto.email,

        phone: orderDto.phone,

        tickets: orderDto.tickets.map((ticket) => ({
          id: randomUUID(),

          film: ticket.film,

          session: ticket.session,

          daytime: ticket.daytime,

          row: ticket.row,

          seat: ticket.seat,

          price: ticket.price,
        })),
      });
    });

    return {
      total: savedOrder.tickets.length,

      items: savedOrder.tickets,
    };
  }

  async getOrders(email: string) {
    return this.orderRepository.find({
      where: {
        email,
      },

      relations: {
        tickets: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }
}
