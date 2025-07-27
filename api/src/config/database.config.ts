import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
dotenv.config();

export class DataSourceConfig {
  static getDatabaseConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      synchronize: false,
    };
  }
}
