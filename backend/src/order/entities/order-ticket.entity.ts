import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { Order } from './order.entity';

@Entity('order_tickets')
export class OrderTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  film: string;

  @Column()
  session: string;

  @Column()
  daytime: string;

  @Column()
  row: number;

  @Column()
  seat: number;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.tickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;
}
