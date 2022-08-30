import database from '../database';
import Info from '../types/Information';

class Information {
  async createInfo(i: Info, user_id: string): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO information (fname, lname, phone, birthday, work, relation, education, lives, story, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
      const result = await connection.query(sql, [
        i.fname.toLowerCase(),
        i.lname.toLowerCase(),
        i.phone,
        i.birthday,
        i.work.toLowerCase(),
        i.relation.toLowerCase(),
        i.education.toLowerCase(),
        i.lives.toLowerCase(),
        i.story,
        user_id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create Post. Error ${(err as Error).message}`);
    }
  }

  async getInfo(user_id: string): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT * FROM information WHERE user_id=($1)';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get Info. Error ${(err as Error).message}`);
    }
  }

  async updateInfo(user_id: string, i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE information SET fname=$2, lname=$3, phone=$4, birthday=$5, work=$6, relation=$7, education=$8, lives=$9, story=$10 WHERE user_id=($1) RETURNING *';
      const result = await connection.query(sql, [
        user_id,
        i.fname.toLowerCase(),
        i.lname.toLowerCase(),
        i.phone,
        i.birthday,
        i.work.toLowerCase(),
        i.relation.toLowerCase(),
        i.education.toLowerCase(),
        i.lives.toLowerCase(),
        i.story,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update Info. Error ${(err as Error).message}`);
    }
  }

  async deleteInfo(user_id: string): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM information * WHERE user_id=($1)';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete Info. Error ${(err as Error).message}`);
    }
  }
}

export default Information;
