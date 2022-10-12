import database from '../database';
import Info from '../types/Information';

class Information {
  async createInfo(i: Info, user_id: string): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO information (profile, fname, lname, phone, birthday, work, relation, education, lives, story, facebook, instagram, whatsapp, linkedin, twitter, telegram, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *';
      const result = await connection.query(sql, [
        i.profile,
        i.fname.toLowerCase(),
        i.lname.toLowerCase(),
        i.phone,
        i.birthday,
        i.work.toLowerCase(),
        i.relation.toLowerCase(),
        i.education.toLowerCase(),
        i.lives.toLowerCase(),
        i.story,
        i.facebook,
        i.instagram,
        i.whatsapp,
        i.linkedin,
        i.twitter,
        i.telegram,
        user_id
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

  async updateInfo(user_id: string, i: Info): Promise<Info> {
    try {
      const connection = await database.connect();
      const sql =
        'UPDATE information SET profile=$2, fname=$3, lname=$4, phone=$5, birthday=$6, work=$7, relation=$8, education=$9, lives=$10, story=$11, facebook=$12, instagram=$13, linkedin=$14, whatsapp=$15, twitter=$16, telegram=$17 WHERE user_id=($1) RETURNING *';
      const result = await connection.query(sql, [
        user_id,
        i.profile,
        i.fname.toLowerCase(),
        i.lname.toLowerCase(),
        i.phone,
        i.birthday,
        i.work.toLowerCase(),
        i.relation.toLowerCase(),
        i.education.toLowerCase(),
        i.lives.toLowerCase(),
        i.story,
        i.facebook,
        i.instagram,
        i.linkedin,
        i.whatsapp,
        i.twitter,
        i.telegram
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update Info. Error ${(err as Error).message}`);
    }
  }

  async updateProfileImage(i: Info): Promise<Info[]> {
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
