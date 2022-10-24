import database from '../database';
import Messages from '../types/Messages';
class Message {
  async newMessage(m: Messages): Promise<Messages> {
    try {
      const connection = await database.connect();
      const sql = `
      INSERT INTO messages
      (sender_id, receiver_id, timedate, content, isSeen)
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING *
      `;
      const result = await connection.query(sql, [
        m.sender_id,
        m.receiver_id,
        new Date(),
        m.content,
        0
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create a new message. Error ${(err as Error).message}`
      );
    }
  }

  async getAllMessages(
    user_id: string,
    receiver_id: string
  ): Promise<Messages[]> {
    try {
      const connection = await database.connect();
      const sql = `
        SELECT DISTINCT u.username, u.first_name, u.last_name, m.*
        FROM messages m, users u
        WHERE
        m.sender_id=$1 AND m.receiver_id=$2 AND u.user_id=$1
        OR
        m.sender_id=$2 AND m.receiver_id=$1 AND u.user_id=$2
        `;
      const result = await connection.query(sql, [user_id, receiver_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get the messages. Error ${(err as Error).message}`
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
        `Could not update the message. Error ${(err as Error).message}`
      );
    }
  }

  async deleteMessage(id: string): Promise<Messages> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM messages WHERE message_id=$1';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create a new message. Error ${(err as Error).message}`
      );
    }
  }
}
export default Message;
