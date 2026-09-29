import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @Column()
  director: string;

  @Column('float')
  rating: number;

  @Column('simple-array')
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}
