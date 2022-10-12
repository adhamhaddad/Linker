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

  async getAllPosts(user_id: string): Promise<Posts[]> {
    try {
      const connection = await database.connect();
      const sql =
        'SELECT DISTINCT u.user_id, u.username, i.fname, i.lname, i.profile, p.* FROM posts p, information i, friends f, users u WHERE p.user_id=f.friend_id AND f.friend_id=i.user_id AND i.user_id=u.user_id AND f.user_id=$1 OR p.user_id=f.user_id AND f.user_id=i.user_id AND i.user_id=u.user_id AND f.friend_id=$1';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could get all the post. Error ${(err as Error).message}`
      );
    }
  }

  async getUserPosts(user_id: string): Promise<Posts[]> {
    try {
      const connection = await database.connect();
      const sql =
        'SELECT DISTINCT u.user_id, u.username, i.fname, i.lname, i.profile, p.* FROM posts p, information i, users u WHERE p.user_id=i.user_id AND i.user_id=u.user_id AND p.user_id=$1';
      const result = await connection.query(sql, [user_id]);
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
