import database from '../database';
import Share from '../types/Shares';

class Shares {
  async createShare(share: Share): Promise<Share> {
    try {
      const connection = await database.connect();
      const sql = `INSERT INTO shares (post_id, user_id, timedate) VALUES ($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [
        share.post_id,
        share.user_id,
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not shares the post. Error ${(error as Error).message}`
      );
    }
  }

  async getAllShares(username: string): Promise<Share[]> {
    try {
      const connection = await database.connect();
      const user_SQL = 'SELECT user_id FROM users WHERE username=$1';
      const user_result = await connection.query(user_SQL, [username]);
      const user_id = user_result.rows[0].user_id;

      const shares_SQL = `
      SELECT DISTINCT u.user_id, u.username, u.first_name, u.last_name, p.profile_picture, s.*
      FROM users u, shares s, pictures p
      WHERE
      p.user_id=u.user_id AND u.user_id=s.user_id AND s.user_id=$1
      `;
      const shares_result = await connection.query(shares_SQL, [user_id]);

      // ///////////////////////////
      const post_SQL = `
      SELECT DISTINCT u.user_id, u.username, u.first_name, u.last_name, p.profile_picture, post.*
      FROM users u, pictures p, posts post
      WHERE p.user_id=u.user_id AND u.user_id=post.user_id AND post.post_id=$1
      `;
      connection.release();
      return shares_result.rows;
    } catch (error) {
      throw new Error(
        `Could not get the shares. Error ${(error as Error).message}`
      );
    }
  }

  //! Need fix later .. when user shares post will be added to posts table with new id and new row
  async updateShare(share: Share): Promise<Share[]> {
    try {
      const connection = await database.connect();
      const sql = `
      UPDATE shares SET caption=$3 WHERE
      share_id=$2 AND user_id=$1
      `;
      const result = await connection.query(sql, [share.user_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not get the shares. Error ${(error as Error).message}`
      );
    }
  }

  async deleteShare(share: Share): Promise<Share> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM shares WHERE post_id=$2 AND user_id=$1';
      const result = await connection.query(sql, [
        share.user_id,
        share.post_id
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete the share. Error ${(error as Error).message}`
      );
    }
  }
}
export default Shares;
