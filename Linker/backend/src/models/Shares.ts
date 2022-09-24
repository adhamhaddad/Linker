import database from '../database';
import Reactions from '../types/Reactions';

class Shares {
  async createShare(shares: Reactions, post_id: string): Promise<Reactions> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO shares (timedate, username, post_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        shares.timedate,
        shares.username,
        post_id
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
      const sql = 'SELECT * FROM shares WHERE post_id=$1';
      const result = await connection.query(sql, [post_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not get the shares. Error ${(error as Error).message}`
      );
    }
  }

  //! Need Fix
  async deleteShare(post_id: string): Promise<Reactions> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM likes WHERE post_id= RETURNING *';
      const result = await connection.query(sql, [post_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete the like. Error ${(error as Error).message}`
      );
    }
  }
}
export default Shares;
