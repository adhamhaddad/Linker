import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import CommentLikes from '../models/CommentLikes';
import { io } from '../server';

const comment = new CommentLikes();

const createLike = async (req: Request, res: Response) => {
  try {
    const response = await comment.createLike(req.body);
    io.emit('likes', { action: 'COMMENT_CREATE_LIKE', data: { ...response } });
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Like created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getLikes = async (req: Request, res: Response) => {
  try {
    const response = await comment.getLikes(req.query.comment_id as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Like recieved successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deleteLike = async (req: Request, res: Response) => {
  try {
    const response = await comment.deleteLike(req.body);
    io.emit('likes', { action: 'COMMENT_DELETE_LIKE', data: { ...response } });
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Like deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const comment_likes_routes_controller = (
  app: Application,
  logger: NextFunction
) => {
  app.post('/comment-like', logger, verifyToken, createLike);
  app.get('/comment-like', logger, verifyToken, getLikes);
  app.delete('/comment-like', logger, verifyToken, deleteLike);
};
export default comment_likes_routes_controller;
