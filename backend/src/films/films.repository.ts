import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,

    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  findAll() {
    return this.filmRepository.find({
      relations: {
        schedule: true,
      },
    });
  }

  findOne(id: string) {
    return this.filmRepository.findOne({
      where: {
        id,
      },

      relations: {
        schedule: true,
      },
    });
  }

  findById(id: string) {
    return this.filmRepository.findOne({
      where: {
        id,
      },

      relations: {
        schedule: true,
      },
    });
  }

  findSchedule(id: string) {
    return this.scheduleRepository.find({
      where: {
        film: {
          id,
        },
      },
    });
  }

  async update(id: string, film: Film) {
    const entity = await this.filmRepository.preload({
      id,
      ...film,
    });

    if (!entity) {
      return null;
    }

    return this.filmRepository.save(entity);
  }
}
