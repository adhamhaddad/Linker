import database from "../database";
import User from "../types/Person";
import bcrypt from 'bcrypt';
import config from '../config';

const hash = (pass: string) => bcrypt.hashSync(pass + config.peper, config.salt);
const getDate = () => {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const suffix = hour >= 12 ? "PM":"AM";
    return `${day}/${month + 1}/${year} - ${hour}:${minutes}:${seconds} ${suffix}`
}
class Person {
    async createUser(u: User): Promise<User> {
        try {
            const connection = await database.connect();
            const sql = 'INSERT INTO person (username, email, password, gender, joined) VALUES ($1, $2, $3, $4, $5) RETURNING username, email, gender, joined';
            const result = await connection.query(sql, [
                u.username.toLocaleLowerCase(),
                u.email.toLocaleLowerCase(),
                hash(u.password),
                u.gender.toLocaleLowerCase(),
                getDate()
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create user. Error ${(err as Error).message}`);
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT username FROM person';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could get all users. Error ${(err as Error).message}`);
        }
    }

    async getUser(id: string): Promise<User> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM person WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get user. Error ${(err as Error).message}`);
        }
    }

    async updateUser(id: string, u: User): Promise<User> {
        try {
            const connection = await database.connect();
            const sql = 'UPDATE person SET username=$2, email=$3, password=$4, gender=$5 WHERE id=$($1) RETURNING username, email, gender';
            const result = await connection.query(sql, [
                id,
                u.username,
                u.email,
                hash(u.password),
                u.gender
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update user. Error ${(err as Error).message}`);
        }
    }

    async deleteUser(id: string): Promise<User> {
        try {
            const connection = await database.connect();
            const sql = 'DELETE FROM person WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create user. Error ${(err as Error).message}`);
        }
    }

    async authenticate (username: string, password: string): Promise<User | null> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT password FROM person WHERE username=($1)';
            const result = await connection.query(sql, [username.toLocaleLowerCase()]);
            
            if (result.rows.length) {
                const db_pass = result.rows[0].password;
                const checkPass = bcrypt.compareSync(password + config.peper, db_pass)

                if (checkPass) {
                    const sql = 'SELECT id, username, email FROM person WHERE username=($1)';
                    const result = await connection.query(sql, [username.toLocaleLowerCase()]);
                    connection.release();
                    return result.rows[0];
                }
            }
            connection.release();
            return null;
        } catch (err) {
            throw new Error(`Could not authenticate the user. Error ${(err as Error).message}`);
        }
    }
}
export default Person;