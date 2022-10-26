import database from '../database';
import Users from '../types/Users';
import config from '../config';
import Info from '../types/Information';

class User {
  async createUser(u: Users, i: Info): Promise<Users> {
    try {
      const connection = await database.connect();
      const sql = `
      INSERT INTO users
      (first_name, last_name, username, email, gender, joined)
      VALUES
      ($1, $2, $3, $4, $5, $6)
      RETURNING
      user_id, first_name, last_name, username, email, gender, joined
      `;
      const result = await connection.query(sql, [
        u.first_name.toLowerCase().trim(),
        u.last_name.toLowerCase().trim(),
        u.username.toLowerCase().trim(),
        u.email.toLowerCase(),
        u.gender.toLowerCase(),
        new Date()
      ]);
      const createInfo = `
      INSERT INTO information
      (
        user_id, job_title,
        relationship, education, location,
        story, birthday
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `;
      const infoResult = await connection.query(createInfo, [
        result.rows[0].user_id,
        null,
        null,
        null,
        null,
        null,
        null
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
        'SELECT user_id, username, first_name, last_name, email, gender, joined FROM users WHERE username=$1';
      const result = await connection.query(sql, [username]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user. Error ${(err as Error).message}`);
    }
  }

  //! Not Done
  async updateUser(u: Users): Promise<Users> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE users SET username=$2, email=$3, password=$4, gender=$5 WHERE user_id=$($1) RETURNING user_id, username, email, gender';
      const result = await connection.query(sql, [
        u.user_id,
        u.username,
        u.email,
        u.gender
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user. Error ${(err as Error).message}`);
    }
  }

  async updateFname(u: Users) {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE information SET fname=$2 WHERE username=$1';
      const result = await connection.query(sql, [
        u.username,
        u.first_name.toLowerCase()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the first name. Error ${(err as Error).message}`
      );
    }
  }
  async updateLname(u: Users): Promise<Users> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE users SET last_name=$2 WHERE user_id=$1';
      const result = await connection.query(sql, [
        u.user_id,
        u.last_name.toLowerCase()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the last name. Error ${(err as Error).message}`
      );
    }
  }

  async updatePhone(u: Users): Promise<Users> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE users SET phone_number=$2 WHERE user_id=$1';
      const result = await connection.query(sql, [u.user_id, u.phone_number]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the last name. Error ${(err as Error).message}`
      );
    }
  }

  async searchByUsername(u: Users): Promise<Users[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT user_id, username, first_name, last_name
      FROM users
      WHERE
      username=$1`;
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
    lname: string | undefined,
    user_id: string
  ): Promise<Info[]> {
    console.log(user_id);
    try {
      const connection = await database.connect();
      const sql = `
      SELECT user_id, username, first_name, last_name
      FROM users
      WHERE
      first_name LIKE '${fname.toLowerCase()}%'
      AND user_id != '${user_id}'
      OR
      last_name LIKE '${lname !== undefined && lname.toLowerCase()}%'
      AND user_id != '${user_id}'
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
  async deleteUser(user_id: string): Promise<Users> {
    console.log('Logged')
    console.log(user_id)
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM users WHERE user_id=$1';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user. Error ${(err as Error).message}`);
    }
  }
}
export default User;
