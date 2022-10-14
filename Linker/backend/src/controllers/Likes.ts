import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Likes from '../models/Likes';

const like = new Likes();

const addLike = async (req: Request, res: Response) => {
  try {
    const response = await like.createLike(req.body);
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

const removeLike = async (req: Request, res: Response) => {
  try {
    await like.deleteLike(req.body);
    res.status(200).json({
      status: true,
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
  app.post('/post/like', logger, verifyToken, addLike);
  app.get('/post/likes', logger, verifyToken, getPostLikes);
  app.delete('/post/like', logger, verifyToken, removeLike);
};
export default likes_controller_routes;
