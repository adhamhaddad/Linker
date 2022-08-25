import { database } from "../database";
import Reactions from "../types/Reactions";

class Reaction {
    async createReactions(r: Reactions): Promise<Reactions> {
        try {
            const connection = await database.connect();
            const sql = 'INSERT INTO reactions (likes, comments, shares) VALUES ($1, $2, $3) RETURNING *';
            const result = await connection.query(sql, [
                r.likes,
                r.comments,
                r.shares
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create reactions. Error ${(err as Error).message}`);
        }
    }

    async getAllReactions(): Promise<Reactions[]> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM reactions';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get all reactions. Error ${(err as Error).message}`);
        }
    }

    async getReactions(id: string): Promise<Reactions> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM reactions WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get reactions. Error ${(err as Error).message}`);
        }
    }

    async updateReactions(id: string, r: Reactions): Promise<Reactions> {
        try {
            const connection = await database.connect();
            const sql = 'UPDATE reactions SET likes=$2, comments=$3, shares=$4 WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [
                id,
                r.likes,
                r.comments,
                r.shares
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update reactions. Error ${(err as Error).message}`);
        }
    }

    async deleteReactions(id: string): Promise<Reactions> {
        try {
            const connection = await database.connect();
            const sql = 'DELETE FROM reactions * WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create reactions. Error ${(err as Error).message}`);
        }
    }
}
export default Reaction;