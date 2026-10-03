import "dayjs/locale/ru";
import dayjs from "dayjs";

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

  protected async _get<T>(uri: string): Promise<T> {
    const response = await fetch(this.baseUrl + uri, {
      ...this._options,
      method: EnumApiMethods.GET,
    });

    return this._handleResponse<T>(response);
  }

  protected async _post<T>(uri: string, data: object): Promise<T> {
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
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export interface Session {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface Ticket {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export interface Contacts {
  email: string;
  phone: string;
}

export interface Order {
  email: string;
  phone: string;
  tickets: Ticket[];
}

export interface OrderResponse {
  total: number;
  items: Array<
    Ticket & {
      id: string;
    }
  >;
}

export interface IFilmAPI {
  getFilms(): Promise<Movie[]>;

  getFilmSchedule(id: string): Promise<Session[]>;

  orderTickets(order: Order): Promise<OrderResponse>;
}

export class FilmAPI extends Api implements IFilmAPI {
  async getFilms(): Promise<Movie[]> {
    const response = await this._get<{
      total: number;
      items: Movie[];
    }>("/films");

    return response.items.map((film) => ({
      ...film,

      image: film.image,
      cover: film.cover,
    }));
  }

  async getFilmSchedule(id: string): Promise<Session[]> {
    const response = await this._get<{
      total: number;
      items: Session[];
    }>(`/films/${id}/schedule`);

    return response.items;
  }

  async orderTickets(order: Order): Promise<OrderResponse> {
    return this._post<OrderResponse>("/order", order);
  }
}
