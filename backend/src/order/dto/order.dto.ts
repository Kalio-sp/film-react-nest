export class TicketDto {
  row: number;
  seat: number;
}

export class OrderDto {
  filmId: string;

  scheduleId: string;

  tickets: TicketDto[];

  email?: string;

  phone?: string;
}
