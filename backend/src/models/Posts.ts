import database from '../database';
import Posts from '../types/Posts';
class Post {
  async createPost(p: Posts, user_id: string): Promise<Posts> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO posts (timedate, caption, img, video, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const result = await connection.query(sql, [
        new Date(),
        p.caption,
        p.img,
        p.video,
        user_id
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create the post. Error ${(err as Error).message}`
      );
    }
  }

  //! This for home page - newsfeed. not for user
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

  async getPost(post_id: string): Promise<Posts> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT * FROM posts WHERE post_id=($1)';
      const result = await connection.query(sql, [post_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get the post. Error ${(err as Error).message}`
      );
    }
  }

  async updatePost(post_id: string, p: Posts): Promise<Posts> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE posts SET caption=$2 WHERE post_id=($1) RETURNING *';
      const result = await connection.query(sql, [post_id, p.caption]);
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
      const sql = 'DELETE FROM posts * WHERE post_id=($1)';
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
