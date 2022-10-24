import database from '../database';
import config from '../config';
import bcrypt from 'bcrypt';
import Password from '../types/Passwords';
import Users from '../types/Users';

const hash = (pass: string) =>
  bcrypt.hashSync(pass + config.peper, config.salt);

class Passwords {
  async createPassword(user_id: string, p: Password): Promise<Password> {
    try {
      const connection = await database.connect();
      const sql = `
        INSERT INTO passwords
        (user_id, old_password, current_password, changed)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *
        `;
      const result = await connection.query(sql, [
        user_id,
        hash(p.old_password),
        hash(p.current_password),
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create password. Error ${(err as Error).message}`
      );
    }
  }
  async changePassword(p: Password): Promise<Password> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE passwords SET old_password=$2 current_password=$3 WHERE user_id=$1';
      const result = await connection.query(sql, [
        p.user_id,
        hash(p.old_password),
        hash(p.current_password),
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not change password. Error ${(error as Error).message}`
      );
    }
  }
  //   ! Need work
  async resetPassword(p: Password): Promise<Password> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE passwords SET old_password=$2 current_password=$3 WHERE user_id=$1';
      const result = await connection.query(sql, [
        p.user_id,
        hash(p.old_password),
        hash(p.current_password),
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not change password. Error ${(error as Error).message}`
      );
    }
  }
  async authenticate(u: Users, p: Password): Promise<Users | null> {
    let sqlCompare;
    let sqlValue;

    if (u.username !== undefined) {
      sqlCompare = 'username';
      sqlValue = u.username;
    } else {
        sqlCompare = 'email';
        sqlValue = u.email;
    }
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT p.current_password
      FROM passwords p, users u
      WHERE u.${sqlCompare}=$1
      `;
      const result = await connection.query(sql, [sqlValue]);
      if (result.rows.length) {
        const db_pass = result.rows[0].current_password;
        const checkPass = bcrypt.compareSync(
          `${p.current_password}${config.peper}`,
          db_pass
        );

        if (checkPass) {
          const sql = `SELECT user_id, username FROM users WHERE ${sqlCompare}=$1`;
          const result = await connection.query(sql, [sqlValue]);
          connection.release();
          return result.rows[0];
        } else {
          throw new Error('Password incorrect');
        }
      }
      connection.release();
      return null;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
export default Passwords;
