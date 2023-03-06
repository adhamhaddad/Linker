import { database } from '../database';
import CR from '../types/CommentReplies';

class CommentReply {
  async createReply(r: CR): Promise<CR[]> {
    try {
      const connection = await database.connect();
      const sql = `
        INSERT INTO comment_replies (comment_id, user_id, timedate, reply_caption, reply_img, reply_video)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const result = await connection.query(sql, [
        r.comment_id,
        r.user_id,
        new Date(),
        r.reply_caption,
        r.reply_img,
        r.reply_video
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt create comment reply. Error ${(err as Error).message}`
      );
    }
  }

  async getReplies(comment_id: string): Promise<CR[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SElECT DISTINCT u.user_id, u.username, u.first_name, u.last_name, p.profile_picture, c.comment_id, c.timedate
      FROM users u, pictures p, comment_replies c
      WHERE p.user_id=u.user_id AND u.user_id=c.user_id AND c.comment_id=$1
      `;
      const result = await connection.query(sql, [comment_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could'nt get replies. Error ${(err as Error).message}`);
    }
  }

  async deleteReply(r: CR): Promise<CR[]> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM comment_replies WHERE reply_id=$1 RETURNING *';
      const result = await connection.query(sql, [r.comment_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt delete the comment reply. Error ${(err as Error).message}`
      );
    }
  }
}
export default CommentReply;
