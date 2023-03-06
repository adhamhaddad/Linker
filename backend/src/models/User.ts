import { database } from '../database';
import Users from '../types/Users';
import Info from '../types/Information';
import bcrypt from 'bcrypt';
import configs from '../configs';

class User {
  async createUser(u: Users, i: Info): Promise<Users> {
    try {
      const connection = await database.connect();
      const createUser_SQL = `
      INSERT INTO users
      (first_name, last_name, username, email, gender, joined)
      VALUES
      ($1, $2, $3, $4, $5, $6)
      RETURNING
      user_id, first_name, last_name, username, email, gender, joined
      `;
      const createInfo_SQL = `
      INSERT INTO information
      (
        user_id, job_title,
        relationship, education, location,
        story, birthday
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `;
      const createProfile_SQL = `
      INSERT INTO pictures
      (user_id, timedate, profile_picture )
      VALUES
      ($1, $2, $3)
      `;

      const createUser_result = await connection.query(createUser_SQL, [
        u.first_name.toLowerCase().trim(),
        u.last_name.toLowerCase().trim(),
        u.username.toLowerCase().trim(),
        u.email.toLowerCase(),
        u.gender.toLowerCase(),
        new Date()
      ]);
      // Create Information ROW
      await connection.query(createInfo_SQL, [
        createUser_result.rows[0].user_id,
        null,
        null,
        null,
        null,
        null,
        null
      ]);
      // Create Profile Picture ROW
      await connection.query(createProfile_SQL, [
        createUser_result.rows[0].user_id,
        null,
        null
      ]);
      connection.release();
      return createUser_result.rows[0];
    } catch (err) {
      if ((err as Error).message.includes('duplicate key')) {
        throw new Error(
          'This username is used before. please enter a different username'
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
      const sql = `
      SELECT DISTINCT
      u.user_id, u.username, u.first_name, u.last_name, u.email, u.gender, u.joined,
      i.job_title, i.relationship, i.education, i.location, i.story,
      p.profile_picture
      FROM users u, pictures p, information i
      WHERE
      p.user_id=u.user_id AND i.user_id=u.user_id AND u.username=$1
      `;
      const result = await connection.query(sql, [username]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user. Error ${(err as Error).message}`);
    }
  }

  async getUserAccount(username: string): Promise<Users[] | {}> {
    try {
      const connection = await database.connect();
      const userSQL =
        'SELECT user_id, username, first_name, last_name, email, gender, joined FROM users WHERE username=$1';
      const passSQL = 'SELECT changed FROM passwords WHERE user_id=$1';
      const user_result = await connection.query(userSQL, [username]);
      const pass_result = await connection.query(passSQL, [
        user_result.rows[0].user_id
      ]);
      connection.release();
      return { ...user_result.rows[0], ...pass_result.rows[0] };
    } catch (err) {
      throw new Error(`Could not get user. Error ${(err as Error).message}`);
    }
  }

  async updateUser(u: Users): Promise<Users[]> {
    try {
      const connection = await database.connect();
      const sql = `
        UPDATE users SET 
        ${Object.keys(u)[1]}=$2
        WHERE user_id=$1 RETURNING
        ${Object.keys(u)[1]}
      `;
      const result = await connection.query(sql, [
        u.user_id,
        Object.keys(u)[1]
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user. Error ${(err as Error).message}`);
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
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT u.user_id, p.profile_picture, u.username, u.first_name, u.last_name
      FROM users u, pictures p
      WHERE
      u.first_name LIKE '${fname.toLowerCase()}%'
      AND
      u.user_id != '${user_id}'
      AND
      p.user_id=u.user_id
      OR
      u.last_name LIKE '${lname !== undefined && lname.toLowerCase()}%'
      AND
      u.user_id != '${user_id}'
      AND
      p.user_id=u.user_id
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
          const theme_SQL =
            'SELECT profile_cover, header_color, home_color FROM themes WHERE user_id=$1';
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
export default User;
