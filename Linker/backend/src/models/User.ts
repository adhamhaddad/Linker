import database from '../database';
import Users from '../types/Users';
import bcrypt from 'bcrypt';
import config from '../config';
import Info from '../types/Information';

const hash = (pass: string) =>
  bcrypt.hashSync(pass + config.peper, config.salt);

class User {
  async createUser(u: Users): Promise<Users> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO users (username, email, password, gender, joined) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, username, email, gender, joined';
      const result = await connection.query(sql, [
        u.username.toLocaleLowerCase().trim(),
        u.email.toLocaleLowerCase(),
        hash(u.password),
        u.gender.toLocaleLowerCase(),
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      if ((err as Error).message.includes('duplicate key')) {
        throw new Error(
          `This username is used before. please enter a different username`
        );
      }
      throw new Error(`Could not create user. Error ${(err as Error).message}`);
    }
  }

  async getAllUsers(): Promise<Users[]> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT user_id, username FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could get all users. Error ${(err as Error).message}`);
    }
  }

  async getUser(username: string): Promise<Users> {
    try {
      const connection = await database.connect();
      const sql =
        'SELECT user_id, username, email, gender, joined FROM users WHERE username=$1';
      const result = await connection.query(sql, [username]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user. Error ${(err as Error).message}`);
    }
  }

  async updateUser(u: Users): Promise<Users> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE users SET username=$2, email=$3, password=$4, gender=$5 WHERE user_id=$($1) RETURNING user_id, username, email, gender';
      const result = await connection.query(sql, [
        u.id,
        u.username,
        u.email,
        hash(u.password),
        u.gender
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user. Error ${(err as Error).message}`);
    }
  }

  async resetPassword(u: Users): Promise<Users> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE users SET password=$2 WHERE username=$1';
      const result = await connection.query(sql, [
        u.username,
        hash(u.password)
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not reset password. Error ${(error as Error).message}`
      );
    }
  }

  async searchByUsername(u: Users): Promise<Users[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT u.user_id, u.username i.fname, i.lname
      FROM users u, information i
      WHERE i.user_id=u.user_id AND u.username=$1`;
      const result = await connection.query(sql, [u.username]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find the user. Error ${(err as Error).message}`
      );
    }
  }
  async searchByName(
    fname: string,
    lname: string | undefined
  ): Promise<Info[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT i.profile, i.fname, i.lname, i.user_id, u.username
      FROM information i, users u
      WHERE
      i.fname LIKE '${fname.toLowerCase()}%'
      AND
      i.user_id=u.user_id
      OR
      i.lname LIKE '${lname !== undefined && lname.toLowerCase()}%'
      AND
      i.user_id=u.user_id
      `;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find the user. Error ${(err as Error).message}`
      );
    }
  }
  async deleteUser(id: string): Promise<Users> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM users WHERE user_id=$1';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user. Error ${(err as Error).message}`);
    }
  }
  async authenticate(u: Users): Promise<Users | null> {
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
      const sql = `SELECT password FROM users WHERE ${sqlCompare}=$1`;
      const result = await connection.query(sql, [sqlValue]);
      if (result.rows.length) {
        const db_pass = result.rows[0].password;
        const checkPass = bcrypt.compareSync(
          `${u.password}${config.peper}`,
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
export default User;
