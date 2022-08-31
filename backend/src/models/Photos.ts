import database from '../database';
import Photo from '../types/Photo';

class Photos {
  async uploadPhoto(p: Photo, info_id: string): Promise<Photo> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO photos (cover, profile, info_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [p.cover, p.profile, info_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not upload the photo Error. ${(err as Error).message}`
      );
    }
  }

  async getPhoto(info_id: string): Promise<Photo> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT * FROM photos WHERE info_id=($1)';
      const result = await connection.query(sql, [info_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get the photo Error. ${(err as Error).message}`
      );
    }
  }

  async updatePhoto(info_id: string, p: Photo): Promise<Photo> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE photos SET cover=$2, profile=$3 WHERE info_id=($1)';
      const result = await connection.query(sql, [info_id, p.cover, p.profile]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the photo Error. ${(err as Error).message}`
      );
    }
  }

  async deletePhoto(info_id: string): Promise<Photo> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM photos WHERE info_id=($1)';
      const result = await connection.query(sql, [info_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete the photo Error. ${(err as Error).message}`
      );
    }
  }
}
export default Photos;
