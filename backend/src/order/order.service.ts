import { BadRequestException, Injectable } from '@nestjs/common';

import { OrderDto } from './dto/order.dto';
import { FilmsRepository } from '../films/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderDto: OrderDto) {
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

    // проверка дубликатов внутри заказа
    if (new Set(seatKeys).size !== seatKeys.length) {
      throw new BadRequestException('Duplicate seats');
    }

    // проверка существования мест
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

    // сохраняем занятые места

    schedule.taken.push(...seatKeys);

    await this.filmsRepository.update(firstTicket.film, film);

    return {
      total: orderDto.tickets.length,

      items: orderDto.tickets.map((ticket) => ({
        id: crypto.randomUUID(),

        film: ticket.film,

        session: ticket.session,

        daytime: ticket.daytime,

        row: ticket.row,

        seat: ticket.seat,

        price: ticket.price,
      })),
    };
  }
}
