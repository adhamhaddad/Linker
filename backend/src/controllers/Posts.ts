import { Request, Response, NextFunction, Application } from 'express';
import Post from '../models/Post';
import verifyToken from '../middlewares/verifyToken';
import { postPicUpload, postVidUpload } from '../middlewares/imagesHandler';
import { io } from '../server';

const post = new Post();

const createPost = async (req: Request, res: Response) => {
  console.log(req.files);
  const postData = {
    user_id: req.body.user_id as string,
    post_caption: req.body.post_caption as string,
    post_img:
      req.file?.fieldname === 'post_img' ? (req.file?.path as string) : null,
    post_video:
      req.file?.fieldname === 'post_video' ? (req.file?.path as string) : null
  };
  console.log(postData);
  try {
    const response = await post.createPost(postData);
    io.emit('posts', { action: 'CREATE_POST', data: { ...response } });
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Post created successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const response = await post.getAllPosts(req.query.user_id as string);
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
};

const getPost = async (req: Request, res: Response) => {
  try {
    const response = await post.getPost(
      req.query.username as string,
      req.query.post_id as string
    );
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Posts retrieved successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getUserPosts = async (req: Request, res: Response) => {
  try {
    const response = await post.getUserPosts(req.query.username as string);
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
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const response = await post.updatePost(req.body);
    io.emit('posts', { action: 'UPDATE_POST', data: { ...response } });
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Post updated successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const response = await post.deletePost(req.body.post_id);
    io.emit('posts', { action: 'DELETE_POST', data: { ...response } });
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Post deleted successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const posts_controller_routes = (app: Application, logger: NextFunction) => {
  app.post(
    '/posts',
    logger,
    verifyToken,
    postPicUpload.fields([
      { name: 'post_img', maxCount: 10 },
      { name: 'post_video', maxCount: 2 }
    ]),
    // postVidUpload.single('post_video'),
    createPost
  );
  app.get('/post', logger, verifyToken, getPost);
  app.get('/posts', logger, verifyToken, getAllPosts);
  app.get('/user-posts', logger, verifyToken, getUserPosts);
  app.patch('/posts', logger, verifyToken, updatePost);
  app.delete('/posts', logger, verifyToken, deletePost);
};
export default posts_controller_routes;
