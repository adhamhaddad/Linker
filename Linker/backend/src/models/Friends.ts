import database from '../database';
import Friend from '../types/Friends';

class Friends {
  async addFriend(f: Friend): Promise<Friend> {
    try {
      const connection = await database.connect();
      const sql = `
      INSERT INTO friends
      (sender_id, receiver_id, timedate, isFriend)
      VALUES
      ($1, $2, $3, $4)
      RETURNING *
      `;
      const result = await connection.query(sql, [
        f.sender_id,
        f.receiver_id,
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

  async getFriends(username: string): Promise<Friend[]> {
    try {
      const connection = await database.connect();
      const user_id_SQL = 'SELECT user_id FROM users WHERE username=$1';
      const user_id_result = await connection.query(user_id_SQL, [username]);
      const user_id = user_id_result.rows[0].user_id;
      const sql = `
      SELECT DISTINCT f.friend_id, u.user_id, u.username, u.first_name, u.last_name
      FROM friends f, users u
      WHERE
      f.sender_id=u.user_id AND f.isFriend='1' AND f.receiver_id=$1
      OR
      f.receiver_id=u.user_id AND f.isFriend='1' AND f.sender_id=$1
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
  async getFriend(f: Friend) {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT isFriend FROM friends
      WHERE
      sender_id=$1 AND receiver_id=$2
      `;
      const result = await connection.query(sql, [f.sender_id, f.receiver_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get Friend. Error ${(err as Error).message}`);
    }
  }
  //! In this case I'am receiver_id
  async friendRequest(user_id: string): Promise<Friend[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT friend_id, f.sender_id, u.username, u.first_name, u.last_name, f.timedate
      FROM friends f, users u
      WHERE
      f.sender_id=u.user_id
      AND
      f.isFriend='0'
      AND
      f.receiver_id=$1
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

  //! In this case I'am receiver_id
  async acceptFriend(f: Friend): Promise<Friend> {
    try {
      const connection = await database.connect();
      const sql = `
        UPDATE friends
        SET isFriend='1'
        WHERE friend_id=$1
        RETURNING
        friend_id
        `;
      const result = await connection.query(sql, [f.friend_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the friend. Error ${(err as Error).message}`
      );
    }
  }
  //! In this case I'am receiver_id
  async ignoreFriend(f: Friend): Promise<Friend> {
    console.log(f.sender_id, f.receiver_id);
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM friends WHERE friend_id=$1';
      const result = await connection.query(sql, [f.friend_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the friend. Error ${(err as Error).message}`
      );
    }
  }
  //! For Block List - Not Needed Now
  async updateFriend(f: Friend, user_id: string): Promise<Friend> {
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

  async deleteFriend(f: Friend): Promise<Friend> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM friends WHERE friend_id=$1 RETURNING friend_id';
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
export default Friends;
