import database from '../database';
import Posts from '../types/Posts';
class Post {
  async createPost(p: Posts): Promise<Posts> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO posts (user_id, timedate, caption, img, video) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const result = await connection.query(sql, [
        p.user_id,
        new Date(),
        p.caption,
        p.img,
        p.video
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create the post. Error ${(err as Error).message}`
      );
    }
  }
  // `
  // SELECT DISTINCT u.username, i.fname, i.lname, p.*
  // FROM posts p, information i, users u, friends f
  // WHERE
  // p.user_id=i.user_id AND i.user_id=u.user_id AND u.user_id=$1
  // OR
  // p.user_id=f.friend_id AND f.friend_id=i.user_id AND i.user_id=u.user_id AND f.user_id=$1
  // OR
  // p.user_id=f.user_id AND f.user_id=i.user_id AND i.user_id=u.user_id AND f.friend_id=$1

  // `
  async getAllPosts(username: string): Promise<Posts[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT u.username, i.fname, i.lname, p.*
      FROM posts p, information i, users u, friends f
      WHERE
      p.user_id=i.user_id AND i.user_id=u.user_id AND u.username=$1
      OR
      p.user_id=f.friend_id AND f.friend_id=i.user_id AND i.user_id=u.user_id AND u.username=$1
      OR
      p.user_id=f.user_id AND f.user_id=i.user_id AND i.user_id=u.user_id AND u.username=$1
      
      `;
      const result = await connection.query(sql, [username]);
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
        SELECT DISTINCT u.user_id, u.username, i.fname, i.lname, p.*
        FROM posts p, information i, users u
        WHERE
        p.user_id=i.user_id AND i.user_id=u.user_id AND u.username=$1
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

  async deletePost(user_id: string, post_id: string): Promise<Posts> {
    try {
      const connection = await database.connect();
      const sql = `
      DELETE FROM posts WHERE
      post_id=$2 AND user_id=$1
      `;
      const result = await connection.query(sql, [user_id, post_id]);
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
