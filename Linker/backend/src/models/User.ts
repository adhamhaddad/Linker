import database from '../database';
import Users from '../types/Users';
import bcrypt from 'bcrypt';
import config from '../config';

const hash = (pass: string) =>
  bcrypt.hashSync(pass + config.peper, config.salt);

class User {
  async createUser(u: Users): Promise<Users> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO users (username, email, password, gender, joined) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, username, email, gender, joined';
      const result = await connection.query(sql, [
        u.username.toLocaleLowerCase(),
        u.email.toLocaleLowerCase(),
        hash(u.password),
        u.gender.toLocaleLowerCase(),
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
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

  async getUser(id: string): Promise<Users> {
    try {
      const connection = await database.connect();
      const sql =
        'SELECT user_id, username, email, gender, joined FROM users WHERE user_id=($1)';
      const result = await connection.query(sql, [id]);
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
      const result = await connection.query(sql, [u.username, hash(u.password)]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not reset password. Error ${(error as Error).message}`
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

  async authenticate(
    username: string,
    password: string
  ): Promise<Users | null> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT password FROM users WHERE username=($1)';
      const result = await connection.query(sql, [
        username.toLocaleLowerCase()
      ]);

      if (result.rows.length) {
        const db_pass = result.rows[0].password;
        const checkPass = bcrypt.compareSync(password + config.peper, db_pass);

        if (checkPass) {
          const sql =
            'SELECT user_id, username, email FROM users WHERE username=($1)';
          const result = await connection.query(sql, [
            username.toLocaleLowerCase()
          ]);
          connection.release();
          return result.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (err) {
      throw new Error(
        `Could not authenticate the user. Error ${(err as Error).message}`
      );
    }
  }
}
export default User;
