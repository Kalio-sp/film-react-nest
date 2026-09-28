import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { FilmsRepository } from '../films/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderDto: OrderDto) {
    const film = await this.filmsRepository.findById(orderDto.filmId);

    if (!film) {
      throw new BadRequestException('Film not found');
    }

    const schedule = film.schedule.find(
      (item) => item.id === orderDto.scheduleId,
    );

    if (!schedule) {
      throw new BadRequestException('Schedule not found');
    }

    const taken = schedule.taken ?? [];

    const tickets = orderDto.tickets.map((ticket) => {
      const key = `${ticket.row}:${ticket.seat}`;

      if (taken.includes(key)) {
        throw new BadRequestException(`Seat ${key} already taken`);
      }

      return {
        id: key,
        row: ticket.row,
        seat: ticket.seat,
        filmId: orderDto.filmId,
        scheduleId: orderDto.scheduleId,
      };
    });

    schedule.taken = [
      ...taken,
      ...tickets.map((ticket) => `${ticket.row}:${ticket.seat}`),
    ];

    await this.filmsRepository.update(orderDto.filmId, film.toObject());

    return {
      items: tickets,
    };
  }
}
