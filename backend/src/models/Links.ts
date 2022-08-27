import database from "../database";
import Link from '../types/Links';

class Links {
    async uploadLink(l: Link, user_id: string): Promise<Link> {
        try {
            const connection = await database.connect();
            const sql = 'INSERT INTO links (facebook, instagram, whatsapp, linkedin, twitter, telegram, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
            const result = await connection.query(sql, [
                l.facebook,
                l.instagram,
                l.whatsapp,
                l.linkedin,
                l.twitter,
                l.telegram,
                user_id
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not upload the link Error. ${(err as Error).message}`);
        }
    }

    async getLink(user_id: string): Promise<Link> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM links WHERE user_id=($1)';
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get the link Error. ${(err as Error).message}`);
        }
    }
    
    async updateLink(user_id: string, l: Link): Promise<Link> {
        try {
            const connection = await database.connect();
            const sql = 'UPDATE links SET facebook=$2, instagram=$3, whatsapp=$4, linkedin=$5, twitter=$6, telegram=$7 WHERE user_id=($1)';
            const result = await connection.query(sql, [
                user_id,
                l.facebook,
                l.instagram,
                l.whatsapp,
                l.linkedin,
                l.twitter,
                l.telegram
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update the link Error. ${(err as Error).message}`);
        }
    }

    async deleteLink(user_id: string): Promise<Link> {
        try {
            const connection = await database.connect();
            const sql = 'DELETE FROM links WHERE user_id=($1)';
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete the link Error. ${(err as Error).message}`);
        }
    }
}
export default Links;