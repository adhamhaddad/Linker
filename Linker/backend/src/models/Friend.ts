import database from '../database';
import Friends from '../types/Friends';

class Friend {
  async addFriend(f: Friends): Promise<Friends> {
    try {
      const connection = await database.connect();
      const add_friend_SQL = `
      INSERT INTO friends
      (sender_id, receiver_id, timedate, isFriend)
      VALUES
      ($1, $2, $3, $4)
      RETURNING *
      `;
      const add_friend_result = await connection.query(add_friend_SQL, [
        f.sender_id,
        f.receiver_id,
        new Date(),
        0
      ]);
      const user_id = add_friend_result.rows[0].sender_id;
      const friend_SQL = `
      SELECT user_id, username, first_name, last_name
      FROM users
      WHERE
      user_id=$1
      `;
      const friend_result = await connection.query(friend_SQL, [user_id]);
      connection.release();
      return { ...add_friend_result.rows[0], ...friend_result.rows[0] };
    } catch (err) {
      throw new Error(
        `Could not save a new friend. Error ${(err as Error).message}`
      );
    }
  }

  async getFriends(username: string): Promise<Friends[]> {
    try {
      const connection = await database.connect();
      const user_id_SQL = 'SELECT user_id FROM users WHERE username=$1';
      const user_id_result = await connection.query(user_id_SQL, [username]);
      const user_id = user_id_result.rows[0].user_id;
      const sql = `
      SELECT DISTINCT f.friend_id, u.user_id, p.profile_picture, u.username, u.first_name, u.last_name
      FROM friends f, users u, pictures p
      WHERE
      f.sender_id=u.user_id AND p.user_id=u.user_id AND f.isFriend='1' AND f.receiver_id=$1
      OR
      f.receiver_id=u.user_id AND p.user_id=u.user_id AND f.isFriend='1' AND f.sender_id=$1
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

  async checkFriend(
    sender_username: string,
    receiver_username: string
  ): Promise<Friends[] | null> {
    try {
      const connection = await database.connect();
      const sender_id_SQL = 'SELECT user_id FROM users WHERE username=$1';
      const receiver_id_SQL = 'SELECT user_id FROM users WHERE username=$1';

      const sender_id_result = await connection.query(sender_id_SQL, [
        sender_username
      ]);
      const receiver_id_result = await connection.query(receiver_id_SQL, [
        receiver_username
      ]);
      const sender_id = sender_id_result.rows[0].user_id;
      const receiver_id = receiver_id_result.rows[0].user_id;
      const check_SQL = `
      SELECT sender_id, receiver_id, isFriend FROM friends
      WHERE
      sender_id=$1 AND receiver_id=$2
      OR
      sender_id=$2 AND receiver_id=$1
      `;
      const result = await connection.query(check_SQL, [
        sender_id,
        receiver_id
      ]);
      connection.release();

      if (result.rows.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(`Could not get Friend. Error ${(err as Error).message}`);
    }
  }
  //! In this case I'am receiver_id
  async friendRequest(user_id: string): Promise<Friend[]> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT friend_id, f.sender_id, u.user_id, u.username, u.first_name, u.last_name, f.timedate
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
  async acceptFriend(f: Friends): Promise<Friends[] | {}> {
    try {
      const connection = await database.connect();

      const accept_friend_SQL = `
        UPDATE friends
        SET isFriend='1', timedate=$2
        WHERE sender_id=$1
        RETURNING
        isFriend, timedate
      `;
      const accepted_friend_result = await connection.query(accept_friend_SQL, [
        f.sender_id,
        new Date()
      ]);
      const accepted_user_SQL = `
        SELECT user_id, username, first_name, last_name
        FROM users
        WHERE user_id=$1
        `;
      const accepted_user_result = await connection.query(accepted_user_SQL, [
        f.sender_id
      ]);
      connection.release();
      return {
        ...accepted_friend_result.rows[0],
        ...accepted_user_result.rows[0]
      };
    } catch (err) {
      throw new Error(
        `Could not accept the friend request. Error ${(err as Error).message}`
      );
    }
  }
  //! For Block List - Not Needed Now
  async updateFriend(f: Friend, user_id: string): Promise<Friends> {
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
      const sql = `
      DELETE FROM friends
      WHERE
      sender_id=$1 AND receiver_id=$2
      OR
      sender_id=$2 AND receiver_id=$1
      RETURNING friend_id
      `;
      const result = await connection.query(sql, [f.sender_id, f.receiver_id]);
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
