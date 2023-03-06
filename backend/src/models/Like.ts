import { database } from '../database';
import Like from '../types/Likes';
class Likes {
  async createLike(l: Like): Promise<Like[]> {
    try {
      const connection = await database.connect();
      const like_SQL =
        'INSERT INTO likes (post_id, user_id, timedate) VALUES ($1, $2, $3) RETURNING post_id, timedate';
      const user_SQL = `
        SELECT DISTINCT u.user_id, u.username, u.first_name, u.last_name, p.profile_picture
        FROM users u, pictures p
        WHERE u.user_id=p.user_id AND u.user_id=$1
      `;
      const like_result = await connection.query(like_SQL, [
        l.post_id,
        l.user_id,
        new Date()
      ]);
      const user_result = await connection.query(user_SQL, [l.user_id]);
      connection.release();
      return { ...like_result.rows[0], ...user_result.rows[0] };
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
      SELECT DISTINCT l.like_id, l.timedate, u.user_id, p.profile_picture, u.username, u.first_name, u.last_name
      FROM users u, likes l, pictures p
      WHERE
      l.post_id=$1 AND l.user_id=p.user_id AND l.user_id=u.user_id
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

  async checkLike(
    post_id: string,
    user_id: string
  ): Promise<Like[] | null | boolean> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT user_id FROM likes WHERE post_id=$1 AND user_id=$2';
      const result = await connection.query(sql, [post_id, user_id]);
      connection.release();
      if (result.rows.length) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(
        `Could not get the likes. Error ${(error as Error).message}`
      );
    }
  }

  async deleteLike(l: Like): Promise<Like> {
    try {
      const connection = await database.connect();
      const like_SQL =
        'DELETE FROM likes WHERE post_id=$1 AND user_id=$2 RETURNING post_id, user_id';
      const like_result = await connection.query(like_SQL, [
        l.post_id,
        l.user_id
      ]);
      connection.release();
      return like_result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete the like. Error ${(error as Error).message}`
      );
    }
  }
}
export default Likes;
