import database from '../database';
import Visitors from '../types/Visitors';

class Visitor {
  async createVisitor(v: Visitors): Promise<Visitors[]> {
    try {
      const connection = await database.connect();
      const user_id = 'SELECT user_id from users WHERE username=$1';
      const user_id_result = await connection.query(user_id, [v.profile_id]);

      const check_SQL = `SELECT * FROM visitors WHERE visitor_id=$1 AND profile_id=$2`;
      const check_result = await connection.query(check_SQL, [
        v.visitor_id,
        user_id_result.rows[0].user_id
      ]);

      const user_SQL = `
        SELECT DISTINCT u.user_id, u.username, u.first_name, u.last_name, p.profile_picture
        FROM users u, pictures p
        WHERE p.user_id=u.user_id AND u.user_id=$1
      `;
      const user_result = await connection.query(user_SQL, [
        user_id_result.rows[0].user_id
      ]);

      if (check_result.rows.length) {
        const update_SQL = `UPDATE visitors SET timedate=$3 WHERE visitor_id=$1 AND profile_id=$2 RETURNING *`;
        const update_result = await connection.query(update_SQL, [
          v.visitor_id,
          user_id_result.rows[0].user_id,
          new Date()
        ]);
        connection.release();
        return { ...user_result.rows[0], ...update_result.rows[0] };
      }
      const create_SQL = `INSERT INTO visitors (visitor_id, profile_id, timedate) VALUES ($1, $2, $3) RETURNING *`;
      const create_result = await connection.query(create_SQL, [
        v.visitor_id,
        user_id_result.rows[0].user_id,
        new Date()
      ]);
      connection.release();
      return { ...user_result.rows[0], ...create_result.rows[0] };
    } catch (err) {
      throw new Error(`Could'nt create visit. Error ${(err as Error).message}`);
    }
  }

  async getVisitors(username: string): Promise<Visitors[]> {
    try {
      const connection = await database.connect();
      const user_id_SQL = 'SELECT user_id FROM users WHERE username=$1';
      const user_id_result = await connection.query(user_id_SQL, [username]);
      const visits_SQL = `
        SELECT DISTINCT u.username, u.first_name, u.last_name, p.profile_picture, v.timedate, v.visitor_id
        FROM visitors v, users u, pictures p
        WHERE v.visitor_id=u.user_id AND p.user_id=u.user_id AND v.profile_id=$1
      `;
      const visits_result = await connection.query(visits_SQL, [
        user_id_result.rows[0].user_id
      ]);
      connection.release();
      return visits_result.rows;
    } catch (err) {
      throw new Error(`Could'nt get visitors. Error ${(err as Error).message}`);
    }
  }
}
export default Visitor;
