import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;

@Schema({ _id: false })
export class Schedule {
  @Prop()
  id: string;

  @Prop()
  daytime: string;

  @Prop()
  hall: string;

  @Prop()
  rows: number;

  @Prop()
  seats: number;

  @Prop()
  price: number;

  @Prop({
    type: [String],
    default: [],
  })
  taken: string[];
}

@Schema()
export class Film {
  @Prop({
    required: true,
    unique: true,
  })
  id: string;

  @Prop()
  rating: number;

  @Prop()
  director: string;

  @Prop({
    type: [String],
    default: [],
  })
  tags: string[];

  @Prop()
  title: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop({
    type: [Schedule],
    default: [],
  })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
