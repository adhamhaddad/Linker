import { database } from "../database";
import Info from "../types/Information";

class Information {
    async createInfo(i: Info): Promise<Info> {
        try {
            const connection = await database.connect();
            const sql = 'INSERT INTO information (work, relation, education, lives, story) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const result = await connection.query(sql, [
                i.work,
                i.relation,
                i.education,
                i.lives,
                i.story
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create Post. Error ${(err as Error).message}`);
        }
    }

    async getAllInfo(): Promise<Info[]> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM information';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get all information. Error ${(err as Error).message}`);
        }
    }

    async getInfo(id: string): Promise<Info> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM information WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get Info. Error ${(err as Error).message}`);
        }
    }

    async updateInfo(id: string, i: Info): Promise<Info> {
        try {
            const connection = await database.connect();
            const sql = 'UPDATE information SET work=$2, relation=$3, education=$4, lives=$5, story=$6 WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [
                id,
                i.work,
                i.relation,
                i.education,
                i.lives,
                i.story
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update Info. Error ${(err as Error).message}`);
        }
    }

    async deleteInfo(id: string): Promise<Info> {
        try {
            const connection = await database.connect();
            const sql = 'DELETE FROM information * WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create Info. Error ${(err as Error).message}`);
        }
    }
}

export default Information;