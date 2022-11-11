import database from '../database';
import Share from '../types/Shares';

class Shares {
  async createShare(share: Share): Promise<Share> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO shares (post_id, user_id, timedate) VALUES ($1, $2, $3) RETURNING *';
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

  async getAllShares(post_id: string): Promise<Share[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT u.username, u.first_name, u.last_name
      FROM users u, shares s
      WHERE
      s.post_id=$1 AND s.user_id=u.user_id
      `;
      const result = await connection.query(sql, [post_id]);
      connection.release();
      return result.rows;
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
      const result = await connection.query(sql, [
        share.user_id,
      ]);
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
