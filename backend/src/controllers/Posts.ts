import { Request, Response, NextFunction, Application } from "express";
import Post from "../models/Post";
import token from '../middlewares/token';

const post = new Post();

const createPost = async (req: Request, res: Response) => {
    try {
        const response = await post.createPost(req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Post created successfully!'
        });
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        });
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const response = await post.getAllPosts();
        res.status(200).json({
            status: true,
            data: response,
            message: 'Posts retrieved successfully!'
        });
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        });
    }
}

const getPost = async (req: Request, res: Response) => {
    try {
        const response = await post.getPost(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Post retrieved successfully!'
        });
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        });
    }
}

const updatePost = async (req: Request, res: Response) => {
    try {
        const response = await post.updatePost(req.params.id, req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Post updated successfully!'
        });
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        });
    }
}

const deletePost = async (req: Request, res: Response) => {
    try {
        const response = await post.deletePost(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Post deleted successfully!'
        });
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        });
    }
}

const posts_controller_routes = (app: Application, logger: NextFunction) => {
    app.post('/posts', logger, createPost)
    app.get('/posts', logger, getAllPosts)
    app.get('/posts/:id', logger, getPost)
    app.patch('/posts/:id', logger, updatePost)
    app.delete('/posts/:id', logger, deletePost)
}
export default posts_controller_routes;