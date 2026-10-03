CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE public.films
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL
        CONSTRAINT "PK_697487ada088902377482c970d1"
            PRIMARY KEY,

    rating double precision NOT NULL,

    director varchar NOT NULL,

    tags text NOT NULL,

    image varchar NOT NULL,

    cover varchar NOT NULL,

    title varchar NOT NULL,

    about varchar NOT NULL,

    description varchar NOT NULL
);


ALTER TABLE public.films
    OWNER TO postgres;


CREATE TABLE public.schedules
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL
        CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd"
            PRIMARY KEY,

    daytime varchar NOT NULL,

    hall integer NOT NULL,

    rows integer NOT NULL,

    seats integer NOT NULL,

    price double precision NOT NULL,

    taken text NOT NULL,

    "filmId" uuid
        CONSTRAINT "FK_1c2f5e637713a429f4854024a76"
            REFERENCES public.films
);


ALTER TABLE public.schedules
    OWNER TO postgres;

    CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS order_tickets (
    id UUID PRIMARY KEY,

    film UUID NOT NULL,

    session UUID NOT NULL,

    daytime VARCHAR(100) NOT NULL,

    row INTEGER NOT NULL,

    seat INTEGER NOT NULL,

    price INTEGER NOT NULL,

    order_id UUID NOT NULL,

    CONSTRAINT fk_order_ticket_order
        FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);