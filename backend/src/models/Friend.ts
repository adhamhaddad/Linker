import { database } from '../database';
import Friends from '../types/Friends';

class Friend {
  async addFriend(f: Friends): Promise<Friends[] | {}> {
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
      const user_SQL = `
        SELECT DISTINCT u.user_id, u.username, u.first_name, u.last_name, p.profile_picture
        FROM users u, pictures p
        WHERE p.user_id=u.user_id AND u.user_id=$1
      `;
      const sender_user_result = await connection.query(user_SQL, [
        f.sender_id
      ]);
      const receiver_user_result = await connection.query(user_SQL, [
        f.receiver_id
      ]);

      connection.release();
      return {
        result: { ...add_friend_result.rows[0] },
        sender_user: { ...sender_user_result.rows[0] },
        receiver_user: { ...receiver_user_result.rows[0] }
      };
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
      const user_id_SQL = 'SELECT user_id FROM users WHERE username=$1';

      const sender_id_result = await connection.query(user_id_SQL, [
        sender_username
      ]);
      const receiver_id_result = await connection.query(user_id_SQL, [
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
      SELECT DISTINCT friend_id, f.sender_id, u.user_id, p.profile_picture, u.username, u.first_name, u.last_name, f.timedate
      FROM friends f, users u, pictures p
      WHERE
      f.sender_id=u.user_id
      AND
      f.isFriend='0'
      AND
      f.sender_id=p.user_id
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

  async acceptFriend(f: Friends): Promise<Friends[] | {}> {
    try {
      const connection = await database.connect();
      const accept_friend_SQL = `
        UPDATE friends
        SET isFriend=$4, timedate=$3
        WHERE sender_id=$1 AND receiver_id=$2
        RETURNING *
      `;
      const accepted_friend_result = await connection.query(accept_friend_SQL, [
        f.sender_id,
        f.receiver_id,
        new Date(),
        1
      ]);
      const user_SQL = `
        SELECT DISTINCT u.user_id, u.username, u.first_name, u.last_name, p.profile_picture
        FROM users u, pictures p
        WHERE p.user_id=u.user_id AND u.user_id=$1
      `;
      const sender_user_result = await connection.query(user_SQL, [
        f.sender_id
      ]);
      const receiver_user_result = await connection.query(user_SQL, [
        f.receiver_id
      ]);
      connection.release();
      return {
        result: { ...accepted_friend_result.rows[0] },
        sender_user: {
          ...sender_user_result.rows[0],
          friend_id: accepted_friend_result.rows[0].friend_id
        },
        receiver_user: {
          ...receiver_user_result.rows[0],
          friend_id: accepted_friend_result.rows[0].friend_id
        }
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

  async deleteFriend(f: Friends): Promise<Friends[] | {}> {
    try {
      const connection = await database.connect();
      const sql = `
        DELETE FROM friends
        WHERE
        sender_id=$1 AND receiver_id=$2
        OR
        sender_id=$2 AND receiver_id=$1
        RETURNING *
      `;

      const result = await connection.query(sql, [f.sender_id, f.receiver_id]);
      const user_SQL = 'SELECT user_id, username FROM users WHERE user_id=$1';
      const sender_user_result = await connection.query(user_SQL, [
        f.sender_id
      ]);
      const receiver_user_result = await connection.query(user_SQL, [
        f.receiver_id
      ]);
      connection.release();
      return {
        result: { ...result.rows[0] },
        sender_user: {
          user_id: result.rows[0].sender_id,
          username: sender_user_result.rows[0].username
        },
        receiver_user: {
          user_id: result.rows[0].receiver_id,
          username: receiver_user_result.rows[0].username
        }
      };
    } catch (err) {
      throw new Error(
        `Could not delete the friend. Error ${(err as Error).message}`
      );
    }
  }
}
export default Friend;
