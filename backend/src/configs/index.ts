import dotenv from 'dotenv';

dotenv.config();

const configs = {
  environment: process.env.ENV,
  port: Number(process.env.PORT),
  db_host: process.env.DB_HOST,
  db_port: Number(process.env.DB_PORT),
  db_user: process.env.DB_USER,
  db_dev: process.env.DB_NAME,
  db_test: process.env.DB_TEST,
  db_password: process.env.DB_PASSWORD,
  token: process.env.SECRET_TOKEN,
  peper: process.env.SECRET_PEPER,
  salt: Number(process.env.SALT_ROUNDS),
  url: process.env.URL
};
export default configs;
