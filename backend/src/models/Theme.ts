import database from '../database';
import Themes from '../types/Theme';

class Theme {
  async createTheme(t: Themes): Promise<Themes[]> {
    try {
      const connection = await database.connect();
      const sql = `INSERT INTO themes (user_id, profile_cover) VALUES ($1, $2) RETURNING profile_cover`;
      const result = await connection.query(sql, [t.user_id, t.profile_cover]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt create the theme. Error ${(err as Error).message}`
      );
    }
  }
  async getThemes(username: string): Promise<Themes[] | {}> {
    try {
      const connection = await database.connect();
      const sql = `SELECT DISTINCT t.profile_cover FROM themes t, users u WHERE t.user_id=u.user_id AND u.username=$1`;
      const result = await connection.query(sql, [username]);
      connection.release();
      if (result.rows.length) {
        return result.rows[0];
      }
      return { profile_cover: 'null' };
    } catch (err) {
      throw new Error(
        `Could'nt create the theme. Error ${(err as Error).message}`
      );
    }
  }
}
export default Theme;
