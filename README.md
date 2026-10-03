# FILM!

Учебное веб-приложение «Афиша»: каталог фильмов, расписание сеансов и покупка билетов.

## Ссылки на задеплоенный проект

- Фронтенд: https://film-for.nomorepartiessite.ru
- Бэкенд (API): https://film-for-api.nomorepartiessite.ru/api/afisha/films

## Стек

- **Фронтенд:** React, TypeScript, Vite
- **Бэкенд:** NestJS, TypeORM
- **База данных:** PostgreSQL (администрирование через pgAdmin)
- **Инфраструктура:** Docker, Docker Compose, nginx, Let's Encrypt (certbot)
- **CI/CD:** GitHub Actions, GitHub Container Registry (ghcr.io)
- **Сервер:** виртуальная машина в Yandex Cloud

## Структура репозитория

```
backend/    NestJS-приложение (API, логгеры, тесты, статика с постерами)
frontend/   React-приложение
nginx/      Dockerfile и конфигурация nginx
docker-compose.yml
.github/workflows/   сборка образов и тесты
```

## API

Все маршруты имеют префикс `/api/afisha`.

| Метод | Путь                  | Описание                    |
| ----- | --------------------- | --------------------------- |
| GET   | `/films`              | Список фильмов              |
| GET   | `/films/:id/schedule` | Расписание сеансов фильма   |
| POST  | `/order`              | Оформление заказа на билеты |

Постеры и обложки раздаются по пути `/content/afisha/<файл>`.

## Переменные окружения

### Бэкенд (`backend/.env`, пример в `backend/.env.example`)

| Переменная                               | Описание                                                    |
| ---------------------------------------- | ----------------------------------------------------------- |
| `PORT`                                   | Порт бэкенда, по умолчанию `3000`                           |
| `DATABASE_DRIVER`                        | Драйвер СУБД, `postgres`                                    |
| `DATABASE_URL`                           | Строка подключения к PostgreSQL                             |
| `DATABASE_HOST`, `DATABASE_PORT`         | Хост и порт БД                                              |
| `DATABASE_NAME`                          | Имя базы данных                                             |
| `DATABASE_USERNAME`, `DATABASE_PASSWORD` | Учётные данные БД                                           |
| `LOGGER_TYPE`                            | Тип логгера: `json`, `tskv` или не задан (человекочитаемый) |

### Docker Compose (`.env` в корне, в git не попадает)

```env
POSTGRES_DB=films
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<пароль>
POSTGRES_PORT=5432
BACKEND_PORT=3000
PGADMIN_EMAIL=<почта для входа в pgAdmin>
PGADMIN_PASSWORD=<пароль для pgAdmin>
```

Файл `.env` содержит секреты и не должен попадать в репозиторий.

## Локальный запуск без Docker

Нужны Node.js 20 и запущенный PostgreSQL.

### База данных

Создайте базу `films` и наполните её скриптами из `backend/test/` в следующем порядке:

1. `postgres.init.sql` (создание таблиц; не нужно, если таблицы уже создал бэкенд при запуске)
2. `postgres.films.sql` (фильмы)
3. `postgres.shedules.sql` (расписание)

Фильмы обязательно загружаются раньше расписания, иначе сработает внешний ключ.

### Бэкенд

```bash
cd backend
npm ci
cp .env.example .env     # укажите свои значения
npm run start:dev
```

### Фронтенд

```bash
cd frontend
npm ci
npm run dev
```

Запросы `/api` и `/content` проксируются на бэкенд через настройки Vite (`vite.config.ts`).

## Запуск в Docker

В корне проекта создайте `.env` (см. выше) и выполните:

```bash
docker compose up -d --build
```

После запуска:

- приложение доступно на порту 80 (после настройки HTTPS на 443);
- pgAdmin доступен на порту 8080.

Состав контейнеров: `postgres`, `backend` (запускается продакшен-сборка из `dist`), `frontend` (собирает `dist` в общий volume), `nginx` (раздаёт фронтенд и проксирует `/api/` и `/content/` на бэкенд), `pgadmin`. Все контейнеры работают в одной сети `film-network`, данные PostgreSQL и pgAdmin хранятся в отдельных volume.

Если вы изменили фронтенд, удалите volume `frontend_dist` перед пересборкой, иначе nginx продолжит отдавать старую версию:

```bash
docker compose down
docker volume rm <имя_проекта>_frontend_dist
docker compose up -d --build
```

Не используйте `docker compose down -v`: это удалит и данные БД.

### Наполнение БД после первого запуска

1. Откройте pgAdmin (порт 8080) и подключите сервер: хост `postgres`, порт `5432`, учётные данные из `.env`.
2. Выполните содержимое `postgres.films.sql`, затем `postgres.shedules.sql` из `backend/test/`.

## Логирование

Тип логгера выбирается переменной окружения `LOGGER_TYPE`:

| Значение  | Логгер       | Формат                                             |
| --------- | ------------ | -------------------------------------------------- |
| не задано | `DevLogger`  | цветной вывод NestJS для разработки                |
| `json`    | `JsonLogger` | JSON-строка на запись                              |
| `tskv`    | `TskvLogger` | TSKV: пары `ключ=значение`, разделённые табуляцией |

## Тесты

```bash
cd backend
npm test
```

Покрыты юнит-тестами форматирование логгера TSKV и контроллер заказов.

## Деплой

### Сервер

- Виртуальная машина в Yandex Cloud, на ней установлены Docker и Docker Compose.
- Доменные имена созданы в сервисе `domain.nomoreparties.site` и указывают на IP виртуальной машины.
- На сервере в директории проекта лежат `docker-compose.yml` и `.env`.
- Порты 80 и 443 открыты. Порт 8080 (pgAdmin) закрыт, доступ к нему только через SSH-тоннель:

```bash
ssh -L 8080:localhost:8080 <пользователь>@<IP сервера>
```

После этого pgAdmin доступен на `http://localhost:8080`.

### HTTPS

Сертификат выпущен через certbot (метод webroot, каталог `/var/www/certbot`) на оба домена. nginx монтирует `/etc/letsencrypt` и `/var/www/certbot`, HTTP-запросы перенаправляются на HTTPS. Проверка продления:

```bash
sudo certbot renew --dry-run
```

### Сборка образов (GitHub Actions)

Воркфлоу `.github/workflows/docker.yml` при пуше в ветки `main` и `review-2` собирает образы бэкенда, фронтенда и nginx и публикует их в GitHub Container Registry:

- `ghcr.io/kalio-sp/film-react-nest-backend:latest`
- `ghcr.io/kalio-sp/film-react-nest-frontend:latest`
- `ghcr.io/kalio-sp/film-react-nest-nginx:latest`

Для публикации используется встроенный `GITHUB_TOKEN`, добавлять секреты вручную не нужно.

### Обновление версии на сервере

```bash
cd ~/film-react-nest
git pull
docker compose up -d --build
```
