import database from '../database';
import Comment from '../types/Comments';

class Comments {
  async createComment(c: Comment): Promise<Comment> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO comments (user_post, user_id, timedate, content) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await connection.query(sql, [
        c.post_id,
        c.user_id,
        new Date(),
        c.comment_caption
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not create the comment. Error ${(error as Error).message}`
      );
    }
  }

  async getAllComments(c: Comment): Promise<Comment[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT u.username, i.fname, i.lname
      FROM information i, users u, comments c
      WHERE
      c.post_id=$1 AND c.user_id=i.user_id AND i.user_id=u.user_id
      `;
      const result = await connection.query(sql, [c.post_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not get the comments. Error ${(error as Error).message}`
      );
    }
  }
  async updateComment(c: Comment): Promise<Comment> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE comments SET comment=$3 WHERE post_id=$2 AND user_id=$1 RETURNING *';
      const result = await connection.query(sql, [
        c.user_id,
        c.post_id,
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

  async deleteComment(user_id: string, post_id: string): Promise<Comment> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM comments WHERE post_id=$2 AND user_id=$1';
      const result = await connection.query(sql, [user_id, post_id]);
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
