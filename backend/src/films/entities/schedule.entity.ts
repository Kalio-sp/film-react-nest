import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryColumn()
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: string;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column('simple-array', {
    default: '',
  })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedule, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'filmId',
  })
  film: Film;
}
