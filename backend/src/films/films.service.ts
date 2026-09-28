import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getFilms() {
    const films = await this.filmsRepository.findAll();

    return {
      items: films.map((film) => ({
        id: film._id.toString(),
        title: film.title,
        about: film.description,
        description: film.description,
        director: film.director,
        rating: film.rating,
        image: film.posterImage,
        cover: film.posterImage,
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
    const film = await this.filmsRepository.findOne(id);

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    return film.schedule ?? [];
  }
}
