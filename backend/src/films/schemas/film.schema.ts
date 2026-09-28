import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;

export class Schedule {
  @Prop()
  id: string;

  @Prop()
  time: string;

  @Prop()
  hall: string;

  @Prop()
  rows: number;

  @Prop()
  seats: number;

  @Prop({
    type: [String],
    default: [],
  })
  taken: string[];

  @Prop()
  day?: string;

  @Prop()
  price?: number;
}

@Schema()
export class Film {
  @Prop()
  title: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop()
  director: string;

  @Prop()
  rating: number;

  @Prop()
  posterImage: string;

  @Prop()
  cover: string;

  @Prop({
    type: [Schedule],
    default: [],
  })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
