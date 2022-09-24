import database from '../database';
import Reactions from '../types/Reactions';

class Comments {
  async createComment(comment: Reactions, post_id: string): Promise<Reactions> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO comments (timedate, username, comment, post_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        comment.timedate,
        comment.username,
        comment.comment,
        post_id
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not create the comment. Error ${(error as Error).message}`
      );
    }
  }

  async getAllComments(post_id: string): Promise<Reactions[]> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT * FROM comments WHERE post_id=$1';
      const result = await connection.query(sql, [post_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not get the comments. Error ${(error as Error).message}`
      );
    }
  }
  async updateComment(post_id: string): Promise<Reactions> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE comments SET comment=$2 WHERE post_id=$1 RETURNING *';
      const result = await connection.query(sql, [post_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update the comments. Error ${(error as Error).message}`
      );
    }
  }

  //! Need Fix
  async deleteComment(post_id: string): Promise<Reactions> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM comments WHERE post_id= RETURNING *';
      const result = await connection.query(sql, [post_id]);
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
