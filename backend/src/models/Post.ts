import { client } from "../config";
import Posts from "../types/Posts.Types";

class Post {
    async createPost(p: Posts): Promise<Posts> {
        try {
            const connection = await client.connect();
            const sql = 'INSERT INTO posts (timedate, content) VALUES ($1, $2) RETURNING *';
            const result = await connection.query(sql, [
                p.timedate,
                p.content,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create Post. Error ${(err as Error).message}`);
        }
    }

    async getAllPosts(): Promise<Posts[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM posts';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could get all Posts. Error ${(err as Error).message}`);
        }
    }

    async getPost(id: string): Promise<Posts[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM posts WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get Post. Error ${(err as Error).message}`);
        }
    }

    async updatePost(p: Posts, id: string): Promise<Posts[]> {
        try {
            const connection = await client.connect();
            const sql = 'UPDATE posts SET content=$2 WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id, p.content]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update Post. Error ${(err as Error).message}`);
        }
    }

    async deletePost(id: string): Promise<Posts[]> {
        try {
            const connection = await client.connect();
            const sql = 'DELETE FROM posts * WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create Post. Error ${(err as Error).message}`);
        }
    }
}
export default Post;