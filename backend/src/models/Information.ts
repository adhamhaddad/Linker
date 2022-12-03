import database from '../database';
import Info from '../types/Information';

class Information {
  async createInfo(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql = `
        INSERT INTO information
        (
        user_id, job_title,
        relationship, education, location,
        story, birthday
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`;
      const result = await connection.query(sql, [
        i.user_id,
        i.job_title.toLowerCase(),
        i.relationship.toLowerCase(),
        i.education.toLowerCase(),
        i.location.toLowerCase(),
        i.story,
        i.birthday
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create Post. Error ${(err as Error).message}`);
    }
  }

  async getInfo(username: string): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT i.*
      FROM users u, information i
      WHERE
      i.user_id=u.user_id AND u.username=$1`;
      const result = await connection.query(sql, [username]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get Info. Error ${(err as Error).message}`);
    }
  }

  async updateInfo(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql = `
        UPDATE information SET
        ${Object.keys(i)[1]}=$2 WHERE user_id=$1
        RETURNING ${Object.keys(i)[1]}`;
      const result = await connection.query(sql, [
        i.user_id,
        Object.values(i)[1]
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the information. Error ${(err as Error).message}`
      );
    }
  }
  async deleteInfo(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql = `
        UPDATE information SET
        ${Object.keys(i)[1]}=$2
        WHERE user_id=$1
        RETURNING ${Object.keys(i)[1]}`;
      const result = await connection.query(sql, [i.user_id, null]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete the information. Error ${(err as Error).message}`
      );
    }
  }
}

export default Information;
