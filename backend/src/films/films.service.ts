import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getFilms() {
    const films = await this.filmsRepository.findAll();

    return {
      total: films.length,

      items: films.map((film) => ({
        id: film.id,
        rating: film.rating,
        director: film.director,
        tags: film.tags,
        title: film.title,
        about: film.about,
        description: film.description,
        image: film.image,
        cover: film.cover,
      })),
    };
  }

  async getFilm(id: string) {
    const film = await this.filmsRepository.findOne(id);

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    return film;
  }

  async getFilmSchedule(id: string) {
    const schedule = await this.filmsRepository.findSchedule(id);

    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
