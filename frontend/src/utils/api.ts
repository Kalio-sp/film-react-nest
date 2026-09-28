import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

export enum EnumApiMethods {
  POST = "POST",
  GET = "GET",
}

export type ErrorState = {
  error: string;
};

export class Api {
  readonly baseUrl: string;
  protected _options: RequestInit;

  constructor(baseUrl: string, options: RequestInit = {}) {
    this.baseUrl = baseUrl;

    this._options = {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    };
  }

  protected async _handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return response.json();
    }

    const data = await response.json();
    return Promise.reject(data.message ?? response.statusText);
  }

  protected async _get<T>(uri: string) {
    const response = await fetch(this.baseUrl + uri, {
      ...this._options,
      method: EnumApiMethods.GET,
    });

    return this._handleResponse<T>(response);
  }

  protected async _post<T>(uri: string, data: object) {
    const response = await fetch(this.baseUrl + uri, {
      ...this._options,
      method: EnumApiMethods.POST,
      body: JSON.stringify(data),
    });

    return this._handleResponse<T>(response);
  }
}

export interface Movie {
  id: string;
  title: string;
  about: string;
  description: string;
  director: string;
  rating: number;
  posterImage: string;
  cover: string;
}

export interface Session {
  id: string;
  time: string;
  hall: string;
  rows: number;
  seats: number;
  taken: string[];

  day?: string;
  price?: number;
}

export interface Ticket {
  row: number;
  seat: number;
}

export interface Contacts {
  email: string;
  phone: string;
}

export interface Order {
  filmId: string;
  scheduleId: string;
  tickets: Ticket[];
  email?: string;
  phone?: string;
}

export interface IFilmAPI {
  getFilms(): Promise<Movie[]>;
  getFilmSchedule(id: string): Promise<Session[]>;
  orderTickets(order: Order): Promise<any>;
}

export class FilmAPI extends Api implements IFilmAPI {
  readonly cdn = "http://localhost:3000";

  async getFilms(): Promise<Movie[]> {
    const response = await this._get<any>("/api/afisha/films");

    const films = response.items ?? response;

    return films.map((film: any) => ({
      id: film.id ?? film._id,
      title: film.title,
      about: film.about,
      description: film.description,
      director: film.director,
      rating: film.rating,

      posterImage: film.image?.startsWith("http")
        ? film.image
        : this.cdn + (film.image ?? film.posterImage),

      cover: film.cover?.startsWith("http")
        ? film.cover
        : this.cdn + (film.cover ?? film.image ?? film.posterImage),
    }));
  }

  async getFilmSchedule(id: string): Promise<Session[]> {
    const data = await this._get<any>(`/api/afisha/films/${id}/schedule`);

    const schedule = Array.isArray(data)
      ? data
      : data.schedule ?? data.items ?? [];

    return schedule.map((item: any) => ({
      id: item.id,
      time: item.time,
      hall: item.hall,
      rows: item.rows,
      seats: item.seats,
      taken: item.taken ?? [],
      day: item.day ?? "",
      price: item.price ?? 500,
    }));
  }

  async orderTickets(order: Order) {
    return this._post("/api/afisha/order", order);
  }
}
