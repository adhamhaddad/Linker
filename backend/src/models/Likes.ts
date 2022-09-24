import database from '../database';
import Reactions from '../types/Reactions';

class Likes {
  async createLike(like: Reactions, post_id: string): Promise<Reactions> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO likes (timedate, username, post_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        like.timedate,
        like.username,
        post_id
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not like the post. Error ${(error as Error).message}`
      );
    }
  }

  async getAllLikes(post_id: string): Promise<Reactions[]> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT * FROM likes WHERE post_id=$1';
      const result = await connection.query(sql, [post_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not get the likes. Error ${(error as Error).message}`
      );
    }
  }

  //! Need Fix
  async deleteLike(post_id: string): Promise<Reactions> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM likes WHERE post_id= RETURNING *';
      const result = await connection.query(sql, [post_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete the like. Error ${(error as Error).message}`
      );
    }
  }
}
export default Likes;
