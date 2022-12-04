import database from '../database';
import configs from '../configs';
import bcrypt from 'bcrypt';
import Passwords from '../types/Passwords';
import Users from '../types/Users';

const hash = (pass: string) =>
  bcrypt.hashSync(`${pass}${configs.peper}`, configs.salt);
class Password {
  async createPassword(u: Users): Promise<Passwords[]> {
    console.log(u);
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
        u.user_id,
        null,
        hash(u.password),
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

  async changePassword(p: Passwords): Promise<Passwords[]> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE passwords SET old_password=$2, current_password=$3, changed=$4 WHERE user_id=$1 RETURNING changed`;
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
  async resetPassword(p: Passwords): Promise<Passwords[]> {
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

  async authenticate(u: Users): Promise<Users | null | {}> {
    try {
      const connection = await database.connect();
      const pass_SQL = `
        SELECT DISTINCT p.current_password
        FROM passwords p, users u
        WHERE p.user_id=u.user_id AND u.${Object.keys(u)[0]}=$1
      `;
      const pass_result = await connection.query(pass_SQL, [
        Object.values(u)[0]
      ]);

      if (pass_result.rows.length) {
        const currentPassword = pass_result.rows[0].current_password;
        const checkPass = bcrypt.compareSync(
          `${Object.values(u)[1]}${configs.peper}`,
          currentPassword
        );

        const user_id_SQL = `SELECT user_id FROM users WHERE ${
          Object.keys(u)[0]
        }=$1`;
        const user_id_result = await connection.query(user_id_SQL, [
          Object.values(u)[0]
        ]);

        if (checkPass) {
          const user_SQL = `
            SELECT DISTINCT u.user_id, p.profile_picture, u.username, u.first_name, u.last_name
            FROM pictures p, users u
            WHERE p.user_id=u.user_id AND u.user_id=$1
          `;
          const theme_SQL = `SELECT profile_cover FROM themes WHERE user_id=$1`;
          const theme_result = await connection.query(theme_SQL, [
            user_id_result.rows[0].user_id
          ]);
          const user_result = await connection.query(user_SQL, [
            user_id_result.rows[0].user_id
          ]);
          connection.release();
          return {
            theme: { ...theme_result.rows[0] },
            user: { ...user_result.rows[0] }
          };
        } else {
          connection.release();
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
export default Password;
