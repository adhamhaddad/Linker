import database from '../database';
import Posts from '../types/Posts';
class Post {
  async createPost(p: Posts): Promise<Posts> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO posts (timedate, caption, img, video, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const result = await connection.query(sql, [
        new Date(),
        p.caption,
        p.img,
        p.video,
        p.user_id
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create the post. Error ${(err as Error).message}`
      );
    }
  }

  async getAllPosts(): Promise<Posts[]> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT * FROM posts';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could get all the post. Error ${(err as Error).message}`
      );
    }
  }

  async getUserPosts(p: Posts): Promise<Posts[]> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT * FROM posts WHERE user_id=($1)';
      const result = await connection.query(sql, [p.user_id]);
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
      const sql = 'UPDATE posts SET caption=$2 WHERE post_id=($1) RETURNING *';
      const result = await connection.query(sql, [p.post_id, p.caption]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the post. Error ${(err as Error).message}`
      );
    }
  }

  async deletePost(p: Posts): Promise<Posts> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM posts WHERE post_id=$1';
      const result = await connection.query(sql, [p.post_id]);
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
