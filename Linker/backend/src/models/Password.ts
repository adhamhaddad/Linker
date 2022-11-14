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
        const currentPassword = result.rows[0].current_password;
        const checkPass = bcrypt.compareSync(
          `${p.current_password}${config.peper}`,
          currentPassword
        );

        if (checkPass) {
          if (sqlCompare === 'username') {
            console.log('Username');
            const user_id_SQL = 'SELECT user_id FROM users WHERE username=$1';
            const user_id_result = await connection.query(user_id_SQL, [
              sqlValue
            ]);
            const user_id = user_id_result.rows[0].user_id;
            const sql = `
            SELECT DISTINCT u.user_id, p.profile_picture, u.username, u.first_name, u.last_name
            FROM
            pictures p, users u
            WHERE p.user_id=$1 AND u.user_id=$1
            `;
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows[0];
          } else {
            const user_id_SQL = 'SELECT user_id FROM users WHERE email=$1';
            const user_id_result = await connection.query(user_id_SQL, [
              sqlValue
            ]);
            const user_id = user_id_result.rows[0].user_id;
            const sql = `
            SELECT DISTINCT u.user_id, p.profile_picture, u.username, u.first_name, u.last_name
            FROM
            pictures p, users u
            WHERE p.user_id=$1 AND u.user_id=$1
            `;
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows[0];
          }
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
