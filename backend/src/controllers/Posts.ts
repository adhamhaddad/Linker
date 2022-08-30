import { Request, Response, NextFunction, Application } from 'express';
import Post from '../models/Posts';
import token from '../middlewares/token';

const post = new Post();

const createPost = async (req: Request, res: Response) => {
  try {
    const response = await post.createPost(req.body, req.params.id);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Post created successfully!',
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message,
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const response = await post.getAllPosts();
    res.status(200).json({
      status: true,
      data: response,
      message: 'Posts retrieved successfully!',
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message,
    });
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const response = await post.getPost(req.params.id);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Post retrieved successfully!',
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const response = await post.updatePost(req.params.id, req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Post updated successfully!',
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    await post.deletePost(req.params.id);
    res.status(200).json({
      status: true,
      message: 'Post deleted successfully!',
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message,
    });
  }
};

const posts_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/user/:id/posts', logger, createPost);
  app.get('/user/:id/posts', logger, getAllPosts);
  app.get('/user/:id/posts', logger, getPost);
  app.patch('/user/:id/posts', logger, updatePost);
  app.delete('/user/:id/posts', logger, deletePost);
};
export default posts_controller_routes;
