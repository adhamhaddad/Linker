import database from '../database';
import Reactions from '../types/Reactions';

class Shares {
  async createShare(share: Reactions): Promise<Reactions> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO shares (post_id, user_id, timedate, caption) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await connection.query(sql, [
        share.post_id,
        share.user_id,
        new Date(),
        share.caption
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not shares the post. Error ${(error as Error).message}`
      );
    }
  }

  async getAllShares(post_id: string): Promise<Reactions[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT u.username, i.fname, i.lname
      FROM information i, users u, shares s
      WHERE
      s.post_id=$1 AND s.user_id=i.user_id AND i.user_id=u.user_id
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
  async updateShare(share: Reactions): Promise<Reactions[]> {
    try {
      const connection = await database.connect();
      const sql = `
      UPDATE shares SET caption=$3 WHERE
      share_id=$2 AND user_id=$1
      `;
      const result = await connection.query(sql, [
        share.id,
        share.user_id,
        share.caption
      ]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not get the shares. Error ${(error as Error).message}`
      );
    }
  }

  async deleteShare(share: Reactions): Promise<Reactions> {
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
