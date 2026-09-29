import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Film, FilmDocument } from './schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name)
    private readonly filmModel: Model<FilmDocument>,
  ) {}

  findAll() {
    return this.filmModel.find().exec();
  }

  findOne(id: string) {
    return this.filmModel.findOne({ id }).exec();
  }

  findById(id: string) {
    return this.filmModel.findOne({ id }).exec();
  }

  findSchedule(id: string) {
    return this.filmModel
      .findOne({ id })
      .select('schedule')
      .exec()
      .then((film) => film?.schedule ?? []);
  }

  update(id: string, film: FilmDocument) {
    return this.filmModel.findOneAndUpdate({ id }, film, { new: true }).exec();
  }
}
