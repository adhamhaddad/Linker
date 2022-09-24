import dotenv from 'dotenv';

dotenv.config();

const config = {
  environment: process.env.ENV,
  port: Number(process.env.PORT),
  db_host: process.env.POSTGRES_HOST,
  db_port: Number(process.env.POSTGRES_PORT),
  db_user: process.env.POSTGRES_USER,
  db_dev: process.env.POSTGRES_DB,
  db_test: process.env.POSTGRES_DB_TEST,
  db_password: process.env.POSTGRES_PASSWORD,
  token: process.env.SECRET_TOKEN,
  peper: process.env.SECRET_PEPER,
  salt: Number(process.env.SALT_ROUNDS),
  url: process.env.URL
};
export default config;
