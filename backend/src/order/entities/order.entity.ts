import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { OrderTicket } from './order-ticket.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => OrderTicket, (ticket) => ticket.order, {
    cascade: true,
  })
  tickets: OrderTicket[];
}
