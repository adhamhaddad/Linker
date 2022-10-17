import database from '../database';
import Friends from '../types/Friends';

class Friend {
  async addFriend(f: Friends): Promise<Friends> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO friends (friend_id, user_id, timedate, isFriend ) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await connection.query(sql, [
        f.friend_id,
        f.user_id,
        new Date(),
        0
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not save a new friend. Error ${(err as Error).message}`
      );
    }
  }

  async getFriends(user_id: string): Promise<Friends[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT u.user_id, u.username, i.profile, i.fname, i.lname
      FROM friends f, information i, users u
      WHERE
      f.friend_id=i.user_id AND i.user_id=u.user_id AND f.user_id=$1 AND isFriend='1'
      OR
      f.user_id=i.user_id AND
      i.user_id=u.user_id AND f.friend_id=$1 AND isFriend='1'
      `;
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get the friends. Error ${(err as Error).message}`
      );
    }
  }

  async friendRequest(user_id: string): Promise<Friends[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT u.user_id, u.username, i.fname, i.lname, f.timedate
      FROM friends f, information i, users u
      WHERE
      f.user_id=i.user_id AND i.user_id=u.user_id
      AND
      f.friend_id=$1 AND isFriend='0'
      `;
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get the friend. Error ${(err as Error).message}`
      );
    }
  }

  async acceptFriend(f: Friends): Promise<Friends> {
    try {
      const connection = await database.connect();
      const sql = `
        UPDATE friends
        SET isFriend='1'
        WHERE friend_id=$1 AND user_id=$2
        `;
      const result = await connection.query(sql, [f.friend_id, f.user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the friend. Error ${(err as Error).message}`
      );
    }
  }
  async ignoreFriend(f: Friends): Promise<Friends> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM friends WHERE friend_id=1 user_id=$2';
      const result = await connection.query(sql, [f.friend_id, f.user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the friend. Error ${(err as Error).message}`
      );
    }
  }
  //! For Block List - Not Needed Now
  async updateFriend(f: Friends, user_id: string): Promise<Friends> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE friends SET friend_id= WHERE user_id=$1 RETURNING *';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the friend. Error ${(err as Error).message}`
      );
    }
  }

  async deleteFriend(f: Friends): Promise<Friends> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM friends WHERE friend_id=$1';
      const result = await connection.query(sql, [f.friend_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete the friend. Error ${(err as Error).message}`
      );
    }
  }
}
export default Friend;
