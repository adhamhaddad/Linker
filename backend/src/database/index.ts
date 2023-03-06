import { Pool, PoolClient } from 'pg';
import configs from '../configs';

const database = new Pool({
  host: configs.db_host,
  port: configs.db_port,
  database: configs.db_dev,
  user: configs.db_user,
  password: configs.db_password
});

database.on('connect', (err) => {
  console.log('DB Connected');
});
database.on('error', (err) => {
  console.log('ERROR');
});
export { database };
