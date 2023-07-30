import { Module } from '@nestjs/common';
import { envConfig } from '../config/envConfig';
import { DataSource } from 'typeorm';
import { DatabaseService } from './database.service';

const dbOptions = {
  port: envConfig.app.database.DB_PORT,
  host: envConfig.app.database.DB_HOST,
  username: envConfig.app.database.DB_USERNAME,
  password: envConfig.app.database.DB_PASSWORD,
  database: envConfig.app.database.DB_NAME,
  type: envConfig.app.database.DB_TYPE as any,
};

export const connection = new DataSource({
  ...dbOptions,
  logging: true,
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
});

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE', // name of the provider used in other modules to inject this service into
    useFactory: async () => {
      await connection.initialize();
    },
    DatabaseService,
  },
];

@Module({
  providers: databaseProvider,
})
export class DatabaseModule {}
