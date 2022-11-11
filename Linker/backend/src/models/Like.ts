import database from '../database';
import Like from '../types/Likes';
class Likes {
  async createLike(like: Like): Promise<Like> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO likes (post_id, user_id, timedate) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        like.post_id,
        like.user_id,
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not like the post. Error ${(error as Error).message}`
      );
    }
  }

  async getPostLikes(post_id: string): Promise<Like[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT l.timedate, u.user_id, u.username, u.first_name, u.last_name
      FROM users u, likes l
      WHERE
      l.post_id=$1 AND l.user_id=u.user_id
      `;
      const result = await connection.query(sql, [post_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not get the likes. Error ${(error as Error).message}`
      );
    }
  }

  async deleteLike(like: Like): Promise<Like> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM likes WHERE post_id=$2 AND user_id=$1';
      const result = await connection.query(sql, [like.user_id, like.post_id]);
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
