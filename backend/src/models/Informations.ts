import { client } from "../config";
import Informations from "../types/Informations.Types";

class Information {
    async createInfo(i: Informations): Promise<Informations> {
        try {
            const connection = await client.connect();
            const sql = 'INSERT INTO informations (work, relation, education, lives) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await connection.query(sql, [
                i.work,
                i.relation,
                i.education,
                i.lives,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create Post. Error ${(err as Error).message}`);
        }
    }

    async getAllInformations(): Promise<Informations[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM informations';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get all informations. Error ${(err as Error).message}`);
        }
    }

    async getInfo(id: string): Promise<Informations[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM informations WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get Info. Error ${(err as Error).message}`);
        }
    }

    async updateInfo(i: Informations, id: string): Promise<Informations[]> {
        try {
            const connection = await client.connect();
            const sql = 'UPDATE informations SET work=$2, relation=$3, education=$4, lives=$5 WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [
                id,
                i.work,
                i.relation,
                i.education,
                i.lives,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update Info. Error ${(err as Error).message}`);
        }
    }

    async deletePost(id: string): Promise<Informations[]> {
        try {
            const connection = await client.connect();
            const sql = 'DELETE FROM informations * WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create Info. Error ${(err as Error).message}`);
        }
    }
}
export default Information;