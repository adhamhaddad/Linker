import database from '../database';
import Posts from '../types/Posts';
class Post {
  async createPost(p: Posts): Promise<Posts> {
    try {
      const connection = await database.connect();
      const post_SQL = `
        INSERT INTO posts
        (user_id, timedate, post_caption, post_img, post_video)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING
        *
        `;
      const post_result = await connection.query(post_SQL, [
        p.user_id,
        new Date(),
        p.post_caption,
        p.post_img,
        p.post_video
      ]);
      const post_user_id = post_result.rows[0].user_id;
      const post_user_SQL = `SELECT username, first_name, last_name FROM users WHERE user_id=$1`;
      const post_user_result = await connection.query(post_user_SQL, [
        post_user_id
      ]);
      connection.release();
      return { ...post_result.rows[0], ...post_user_result.rows[0] };
    } catch (err) {
      throw new Error(
        `Could not create the post. Error ${(err as Error).message}`
      );
    }
  }
  
  async getAllPosts(user_id: string): Promise<Posts[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT p.user_id, u.username, u.first_name, u.last_name, p.*
      FROM posts p, users u, friends f
      WHERE
      
      p.user_id=f.sender_id
      AND
      f.sender_id=u.user_id
      AND
      f.receiver_id=$1
      AND
      f.isFriend='1'
      
      OR
      
      p.user_id=f.receiver_id
      AND
      f.receiver_id=u.user_id
      AND
      f.sender_id=$1
      AND
      f.isFriend='1'

      OR
      
      p.user_id=u.user_id
      AND
      u.user_id=$1
      `;
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could get all the post. Error ${(err as Error).message}`
      );
    }
  }

  async getUserPosts(username: string): Promise<Posts[]> {
    try {
      const connection = await database.connect();
      const sql = `
        SELECT DISTINCT p.user_id, u.username, u.first_name, u.last_name, p.*
        FROM posts p, users u
        WHERE
        p.user_id=u.user_id AND u.username=$1
        `;
      const result = await connection.query(sql, [username]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get the user posts. Error ${(err as Error).message}`
      );
    }
  }

  async updatePost(p: Posts): Promise<Posts> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE posts SET post_caption=$2 WHERE post_id=($1) RETURNING *';
      const result = await connection.query(sql, [p.post_id, p.post_caption]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the post. Error ${(err as Error).message}`
      );
    }
  }

  async deletePost(post_id: string): Promise<Posts> {
    try {
      const connection = await database.connect();
      const sql = `
      DELETE FROM posts
      WHERE
      post_id=$1
      RETURNING
      post_id
      `;
      const result = await connection.query(sql, [post_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete the post. Error ${(err as Error).message}`
      );
    }
  }
}
export default Post;
