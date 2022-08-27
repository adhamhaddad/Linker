import database from "../database";
import Posts from "../types/Posts";

const getDate = () => {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const suffix = hour >= 12 ? "PM":"AM";
    return `${day}/${month + 1}/${year} - ${hour}:${minutes}:${seconds} ${suffix}`
}
class Post {
    async createPost(p: Posts, user_id: string): Promise<Posts> {
        try {
            const connection = await database.connect();
            const sql = 'INSERT INTO posts (timedate, content, user_id) VALUES ($1, $2, $3) RETURNING *';
            const result = await connection.query(sql, [
                getDate(),
                p.content,
                user_id
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create the post. Error ${(err as Error).message}`);
        }
    }

    //! This for home page - newsfeed. not for user
    async getAllPosts(): Promise<Posts[]> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM posts';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could get all the post. Error ${(err as Error).message}`);
        }
    }

    async getPost(user_id: string): Promise<Posts> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM posts WHERE user_id=($1)';
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get the post. Error ${(err as Error).message}`);
        }
    }

    async updatePost(user_id: string, p: Posts): Promise<Posts> {
        try {
            const connection = await database.connect();
            const sql = 'UPDATE posts SET content=$2 WHERE user_id=($1) RETURNING *';
            const result = await connection.query(sql, [user_id, p.content]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update the post. Error ${(err as Error).message}`);
        }
    }

    async deletePost(user_id: string): Promise<Posts> {
        try {
            const connection = await database.connect();
            const sql = 'DELETE FROM posts * WHERE user_id=($1)';
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete the post. Error ${(err as Error).message}`);
        }
    }
}
export default Post;