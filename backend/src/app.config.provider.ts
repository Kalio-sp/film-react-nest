import { ConfigModule, ConfigService } from '@nestjs/config';

export interface AppConfig {
  port: number;

  database: {
    url: string;
  };
}

export const configProvider = {
  imports: [ConfigModule],

  provide: 'CONFIG',

  inject: [ConfigService],

  useFactory: (configService: ConfigService): AppConfig => ({
    port: Number(configService.get<string>('PORT')) || 3000,

    database: {
      url: configService.get<string>('MONGO_URL') ?? '',
    },
  }),
};
