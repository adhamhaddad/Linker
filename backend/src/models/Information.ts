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

  /*
  async updateProfile(username: string, i: Info): Promise<Info[]> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE information SET profile=$2 WHERE username=$1 RETURNING *';
      const result = await connection.query(sql, [username, i.profile]);
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
  */
  async updateStory(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE information SET story=$2 WHERE user_id=$1 RETURNING story';
      const result = await connection.query(sql, [i.user_id, i.story]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the story. Error ${(err as Error).message}`
      );
    }
  }
  async updateRelationship(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE information SET relationship=$2 WHERE user_id=$1 RETURNING relationship';
      const result = await connection.query(sql, [i.user_id, i.relationship]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the story. Error ${(err as Error).message}`
      );
    }
  }
  async updateLocation(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE information SET location=$2 WHERE user_id=$1 RETURNING location';
      const result = await connection.query(sql, [i.user_id, i.location]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the story. Error ${(err as Error).message}`
      );
    }
  }

  async updateBirthday(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE information SET birthday=$2 WHERE user_id=$1 RETURNING birthday';
      const result = await connection.query(sql, [i.user_id, i.birthday]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the story. Error ${(err as Error).message}`
      );
    }
  }

  async updateJobTitle(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE information SET job_title=$2 WHERE user_id=$1 RETURNING job_title';
      const result = await connection.query(sql, [i.user_id, i.job_title]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the story. Error ${(err as Error).message}`
      );
    }
  }

  async updateEducation(i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE information SET education=$2 WHERE user_id=$1 RETURNING education';
      const result = await connection.query(sql, [i.user_id, i.education]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the story. Error ${(err as Error).message}`
      );
    }
  }
}

export default Information;
