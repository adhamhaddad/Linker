import { database } from '../database';
import Comment from '../types/Comments';

class Comments {
  async createComment(c: Comment): Promise<Comment[]> {
    try {
      const connection = await database.connect();
      const user_SQL = `
        SELECT DISTINCT u.username, p.profile_picture, u.first_name, u.last_name
        FROM users u, pictures p
        WHERE p.user_id=u.user_id AND u.user_id=$1
      `;
      const comment_SQL = `
        INSERT INTO comments
        (post_id, user_id, timedate, comment_caption, comment_img, comment_video)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const user_result = await connection.query(user_SQL, [c.user_id]);
      const comment_result = await connection.query(comment_SQL, [
        c.post_id,
        c.user_id,
        new Date(),
        c.comment_caption,
        c.comment_img,
        c.comment_video
      ]);
      connection.release();
      return { ...user_result.rows[0], ...comment_result.rows[0] };
    } catch (error) {
      throw new Error(
        `Could not create the comment. Error ${(error as Error).message}`
      );
    }
  }

  async getAllComments(post_id: string): Promise<Comment[]> {
    try {
      const connection = await database.connect();
      const sql = `
        SELECT DISTINCT
        u.user_id, p.profile_picture, u.username, u.first_name, u.last_name,
        c.comment_id, c.timedate, c.comment_caption, c.comment_img, c.comment_video
        FROM users u, pictures p, comments c 
        WHERE
        c.post_id=$1 AND c.user_id=p.user_id AND c.user_id=u.user_id
      `;
      const result = await connection.query(sql, [post_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not get the comments. Error ${(error as Error).message}`
      );
    }
  }
  async updateComment(c: Comment): Promise<Comment[]> {
    try {
      const connection = await database.connect();
      const sql = `
        UPDATE comments SET
        comment_caption=$3
        WHERE
        post_id=$1 AND user_id=$2
        RETURNING *
      `;
      const result = await connection.query(sql, [
        c.post_id,
        c.user_id,
        c.comment_caption
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update the comments. Error ${(error as Error).message}`
      );
    }
  }

  async deleteComment(comment_id: string): Promise<Comment[]> {
    try {
      const connection = await database.connect();
      const sql =
        'DELETE FROM comments WHERE comment_id=$1 RETURNING post_id, comment_id';
      const result = await connection.query(sql, [comment_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete the comments. Error ${(error as Error).message}`
      );
    }
  }
}
export default Comments;
