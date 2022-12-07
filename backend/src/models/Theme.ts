import database from '../database';
import Themes from '../types/Theme';

class Theme {
  async createTheme(t: Themes): Promise<Themes[]> {
    try {
      const connection = await database.connect();
      const check_SQL = 'SELECT * FROM themes WHERE user_id=$1';
      const check_result = await connection.query(check_SQL, [t.user_id]);
      
      if (check_result.rows.length) {
        const update_SQL = `UPDATE themes SET ${Object.keys(t)[1]}=$2 WHERE user_id=$1 RETURNING *`;
        const update_result = await connection.query(update_SQL, [t.user_id, Object.values(t)[1]]);
        connection.release();
        return update_result.rows[0];
      }
      
      const create_SQL = `INSERT INTO themes (user_id, header_color, profile_cover, home_color) VALUES ($1, $2, $3, $4) RETURNING *`;
      await connection.query(create_SQL, [t.user_id, null, null, null]);
      const update_SQL = `UPDATE themes SET ${Object.keys(t)[1]}=$2 WHERE user_id=$1 RETURNING *`;
      const update_result = await connection.query(update_SQL, [t.user_id, Object.values(t)[1]]);

      connection.release()
      return update_result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt create the theme. Error ${(err as Error).message}`
      );
    }
  }

  async getThemes(username: string): Promise<Themes[] | {}> {
    try {
      const connection = await database.connect();
      const sql = `
        SELECT DISTINCT t.profile_cover, t.home_color, t.header_color
        FROM themes t, users u
        WHERE t.user_id=u.user_id AND u.username=$1
      `;
      const result = await connection.query(sql, [username]);
      connection.release();
      if (result.rows.length) {
        return result.rows[0];
      }
      return { profile_cover: null , header_color: null, home_color: null};
    } catch (err) {
      throw new Error(
        `Could'nt create the theme. Error ${(err as Error).message}`
      );
    }
  }
}
export default Theme;
