import database from '../database';
import Messages from '../types/Messages';
class Message {
  async newMessage(m: Messages): Promise<Messages> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO messages (timedate, content, user_id, receiver_id) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await connection.query(sql, [
        new Date(),
        m.content,
        m.user_id,
        m.receiver_id
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create a new message. Error ${(err as Error).message}`
      );
    }
  }

  async getAllMessages(user_id: string): Promise<Messages[]> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT * FROM messages WHERE user_id=$1';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get the messages. Error ${(err as Error).message}`
      );
    }
  }

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
      const sql = 'DELETE FROM messages WHERE id=$1';
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
