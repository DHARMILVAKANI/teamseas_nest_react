import * as dotEnv from 'dotenv';
dotEnv.config();

export const envConfig = {
  app: {
    database: {
      DB_PORT: process.env.DB_PORT,
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_HOST: process.env.DB_HOST,
      DB_NAME: process.env.DB_NAME,
      DB_TYPE: process.env.DB_TYPE,
    },
  },
};
