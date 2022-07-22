import { client } from "../config";
import User from "../types/User.Types";

class Person {
    async createUser(u: User): Promise<User> {
        try {
            const connection = await client.connect();
            const sql = 'INSERT INTO person (fname, lname, gender, birthdate, username, email, phone, passwd, joined) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
            const result = await connection.query(sql, [
                u.fname,
                u.lname,
                u.gender,
                u.birthdate,
                u.username,
                u.email,
                u.phone,
                u.passwd,
                u.joined,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create user. Error ${(err as Error).message}`);
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM person';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could get all users. Error ${(err as Error).message}`);
        }
    }

    async getUser(id: string): Promise<User[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM person WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get user. Error ${(err as Error).message}`);
        }
    }

    async updateUser(u: User, username: string): Promise<User[]> {
        try {
            const connection = await client.connect();
            const sql = 'UPDATE person SET fname=$2, lname=$3, gender=$4, birthdate=$5, username=$6, email=$7, phone=$8, passwd=$9 WHERE username=$($1) RETURNING *';
            const result = await connection.query(sql, [
                username,
                u.fname,
                u.lname,
                u.gender,
                u.birthdate,
                u.username,
                u.email,
                u.phone,
                u.passwd,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update user. Error ${(err as Error).message}`);
        }
    }

    async deleteUser(id: string): Promise<User[]> {
        try {
            const connection = await client.connect();
            const sql = 'DELETE FROM person WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create user. Error ${(err as Error).message}`);
        }
    }
}
export default Person;