import { database } from '../database';
import Pictures from '../types/Pictures';

class Picture {
  async createPicture(p: Pictures): Promise<Pictures[]> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO pictures (user_id, timedate, profile_picture) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        p.user_id,
        new Date(),
        p.profile_picture
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create the profile picture. Error ${(err as Error).message}`
      );
    }
  }

  async getPicture(username: string): Promise<Pictures[]> {
    try {
      const connection = await database.connect();
      const user_id_SQL = 'SELECT user_id FROM users WHERE username=$1';
      const user_id_result = await connection.query(user_id_SQL, [username]);
      const user_id = user_id_result.rows[0].user_id;
      const sql =
        'SELECT timedate, profile_picture FROM pictures WHERE user_id=$1';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get the profile picture. Error ${(err as Error).message}`
      );
    }
  }

  async updatePicture(p: Pictures): Promise<Pictures[]> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE pictures SET timedate=$2, profile_picture=$3 WHERE user_id=$1 RETURNING *';
      const result = await connection.query(sql, [
        p.user_id,
        new Date(),
        p.profile_picture
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the profile picture. Error ${(err as Error).message}`
      );
    }
  }

  async deletePicture(p: Pictures): Promise<Pictures[]> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM pictures WHERE user_id=$1 RETURNING *';
      const result = await connection.query(sql, [p.user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete the profile picture. Error ${(err as Error).message}`
      );
    }
  }
}
export default Picture;
