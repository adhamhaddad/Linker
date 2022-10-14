import database from '../database';
import Info from '../types/Information';

class Information {
  async createInfo(i: Info, user_id: string): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql = `
        INSERT INTO information
        (
          user_id, fname, lname,
          phone, profile, birthday,
          work, relation, education,
          lives, story, linkedin,
          twitter
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *`;
      const result = await connection.query(sql, [
        user_id,
        i.fname.toLowerCase(),
        i.lname.toLowerCase(),
        i.phone,
        i.profile,
        i.birthday,
        i.work.toLowerCase(),
        i.relation.toLowerCase(),
        i.education.toLowerCase(),
        i.lives.toLowerCase(),
        i.story,
        i.twitter,
        i.linkedin
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
      const sql = 'SELECT * FROM information WHERE user_id=$1';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get Info. Error ${(err as Error).message}`);
    }
  }

  async updateFname(i: Info) {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE information SET fname=$2, WHERE user_id=$1';
      const result = await connection.query(sql, [
        i.user_id,
        i.fname.toLowerCase()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the first name. Error ${(err as Error).message}`
      );
    }
  }
  async updateLname(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE information SET lname=$2, WHERE user_id=$1';
      const result = await connection.query(sql, [
        i.user_id,
        i.lname.toLowerCase()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the last name. Error ${(err as Error).message}`
      );
    }
  }

  async updatePhone(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE information SET phone=$2, WHERE user_id=$1';
      const result = await connection.query(sql, [i.user_id, i.phone]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the last name. Error ${(err as Error).message}`
      );
    }
  }

  async updateProfile(i: Info): Promise<Info[]> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE information SET profile=$2 WHERE user_id=$1 RETURNING *';
      const result = await connection.query(sql, [i.user_id, i.profile]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update the profile picture. Error ${
          (error as Error).message
        }`
      );
    }
  }
  async updateStory(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE information SET story=$2, WHERE user_id=$1';
      const result = await connection.query(sql, [i.user_id, i.story]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the story. Error ${(err as Error).message}`
      );
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
