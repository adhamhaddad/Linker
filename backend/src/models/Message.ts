import { database } from '../database';
import Messages from '../types/Messages';
class Message {
  async newMessage(
    sender_username: string,
    receiver_username: string,
    content: string
  ): Promise<Messages | {}> {
    try {
      const connection = await database.connect();
      const user_id_SQL =
        'SELECT user_id, username FROM users WHERE username=$1';
      const receiver_id_result = await connection.query(user_id_SQL, [
        receiver_username
      ]);
      const sender_id_result = await connection.query(user_id_SQL, [
        sender_username
      ]);
      const sender_id = sender_id_result.rows[0].user_id;
      const receiver_id = receiver_id_result.rows[0].user_id;
      const user_picture_SQL =
        'SELECT profile_picture FROM pictures WHERE user_id=$1';
      const user_picture_result = await connection.query(user_picture_SQL, [
        sender_id
      ]);
      const sql = `
      INSERT INTO messages
      (sender_id, receiver_id, timedate, content, isSeen)
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING *
      `;
      const result = await connection.query(sql, [
        sender_id,
        receiver_id,
        new Date(),
        content,
        0
      ]);
      connection.release();
      return {
        ...result.rows[0],
        ...user_picture_result.rows[0],
        sender_username,
        receiver_username
      };
    } catch (err) {
      throw new Error(
        `Could not create the message. Error ${(err as Error).message}`
      );
    }
  }

  async getAllMessages(
    sender_username: string,
    receiver_username: string
  ): Promise<Messages[]> {
    try {
      const connection = await database.connect();
      const receiver_id_SQL = 'SELECT user_id FROM users WHERE username=$1';
      const sender_id_SQL = 'SELECT user_id FROM users WHERE username=$1';
      const receiver_id_result = await connection.query(receiver_id_SQL, [
        receiver_username
      ]);
      const sender_id_result = await connection.query(sender_id_SQL, [
        sender_username
      ]);
      const receiver_id = receiver_id_result.rows[0].user_id;
      const sender_id = sender_id_result.rows[0].user_id;
      const sql = `
        SELECT DISTINCT p.profile_picture, u.username, u.first_name, u.last_name, m.*
        FROM messages m, users u, pictures p
        WHERE
        m.sender_id=$1 AND m.receiver_id=$2 AND p.user_id=$1 AND u.user_id=$1
        OR
        m.sender_id=$2 AND m.receiver_id=$1 AND p.user_id=$2 AND u.user_id=$2
        `;
      const result = await connection.query(sql, [sender_id, receiver_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Couldn't get the messages. Error ${(err as Error).message}`
      );
    }
  }

  async getMessagesList(
    sender_id: string,
    receiver_id: string
  ): Promise<Messages[]> {
    try {
      const connection = await database.connect();
      const user_messages_SQL = `
      SELECT * FROM messages
      WHERE
      sender_id=$1 AND receiver_id=$2
      OR
      sender_id=$2 AND receiver_id=$1
      ORDER BY timedate DESC LIMIT 1
      `;
      const result_SQL = await connection.query(user_messages_SQL, [
        sender_id,
        receiver_id
      ]);
      connection.release();
      return result_SQL.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't get the messages list. Error ${(err as Error).message}`
      );
    }
  }

  //! Need Fix
  async updateMessage(m: Messages, user_id: string): Promise<Messages> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE messages SET content=$2 WHERE user_id=$1 RETURNING *';
      const result = await connection.query(sql, [user_id, m.content]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't update the message. Error ${(err as Error).message}`
      );
    }
  }

  async deleteMessage(
    sender_username: string,
    receiver_username: string,
    message_id: string
  ): Promise<Messages[]> {
    try {
      const connection = await database.connect();
      const sql =
        'DELETE FROM messages WHERE message_id=$1 RETURNING message_id';
      const result = await connection.query(sql, [message_id]);
      connection.release();
      return { ...result.rows[0], sender_username, receiver_username };
    } catch (err) {
      throw new Error(
        `Couldn't delete the message. Error ${(err as Error).message}`
      );
    }
  }
}
export default Message;
