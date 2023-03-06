import { database } from '../database';
import CL from '../types/CommentLikes';

class CommentLike {
  async createLike(l: CL): Promise<CL[]> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO comment_likes (comment_id, user_id, timedate) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        l.comment_id,
        l.user_id,
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt create like. Error ${(err as Error).message}`);
    }
  }

  async getLikes(comment_id: string): Promise<CL[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SElECT DISTINCT u.user_id, u.username, u.first_name, u.last_name, p.profile_picture, c.comment_id, c.timedate
      FROM users u, pictures p, comment_likes c
      WHERE p.user_id=u.user_id AND u.user_id=c.user_id AND c.comment_id=$1
      `;
      const result = await connection.query(sql, [comment_id]);

      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could'nt get likes. Error ${(err as Error).message}`);
    }
  }

  async deleteLike(l: CL): Promise<CL[]> {
    try {
      const connection = await database.connect();
      const sql =
        'DELETE FROM comment_likes WHERE comment_id=$1 AND user_id=$2 RETURNING *';
      const result = await connection.query(sql, [l.comment_id, l.user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt delete like. Error ${(err as Error).message}`);
    }
  }
}
export default CommentLike;
