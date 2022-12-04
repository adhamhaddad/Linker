import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Likes from '../models/Like';
import { io } from '../server';

const like = new Likes();

const addLike = async (req: Request, res: Response) => {
  try {
    const response = await like.createLike(req.body);
    io.emit('likes', { action: 'SET_LIKE', data: { ...response } });
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Like added successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getPostLikes = async (req: Request, res: Response) => {
  try {
    const response = await like.getPostLikes(req.query.post_id as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Retrieved the all likes successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};
const checkLike = async (req: Request, res: Response) => {
  try {
    const response = await like.checkLike(
      req.query.post_id as string,
      req.query.user_id as string
    );
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'like Found successfully!'
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
    const response = await like.deleteLike(req.body);
    io.emit('likes', { action: 'UNSET_LIKE', data: { ...response } });
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Like removed successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const likes_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/post/likes', logger, verifyToken, addLike);
  app.get('/post/likes', logger, verifyToken, getPostLikes);
  app.get('/post/like-check', logger, verifyToken, checkLike);
  app.delete('/post/likes', logger, verifyToken, deleteLike);
};
export default likes_controller_routes;
