import database from '../database';
import configs from '../configs';
import bcrypt from 'bcrypt';
import Passwords from '../types/Passwords';
import Users from '../types/Users';

const hash = (pass: string) =>
  bcrypt.hashSync(`${pass}${configs.peper}`, configs.salt);
  // hash(, (error) => {})
class Password {
  async createPassword(u: Users): Promise<Passwords[]> {
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

  async resetPassword(p: Passwords): Promise<Passwords[]> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE passwords SET old_password=$2, current_password=$3, changed=$4 WHERE user_id=$1 RETURNING changed`;
      const result = await connection.query(sql, [
        p.user_id,
        hash(p.current_password),
        hash(p.current_password),
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not reset password. Error ${(error as Error).message}`
      );
    }
  }
}
export default Password;
