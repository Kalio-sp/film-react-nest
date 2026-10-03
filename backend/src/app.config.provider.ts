export const configProvider = {
  provide: 'APP_CONFIG',

  useFactory: () => ({
    port: Number(process.env.PORT) || 3000,

    database: {
      driver: process.env.DATABASE_DRIVER || 'postgres',

      url: process.env.DATABASE_URL,

      host: process.env.DATABASE_HOST || 'localhost',

      port: Number(process.env.DATABASE_PORT) || 5432,

      name: process.env.DATABASE_NAME || 'films',

      username: process.env.DATABASE_USERNAME || 'postgres',

      password: process.env.DATABASE_PASSWORD || '',
    },
  }),
};
