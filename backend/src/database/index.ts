import { Pool } from 'pg';
import config from '../config';

const database = new Pool({
  host: config.db_host,
  port: Number(config.db_port),
  database: config.db_dev,
  user: config.db_user,
  password: config.db_password,
});
export default database;
