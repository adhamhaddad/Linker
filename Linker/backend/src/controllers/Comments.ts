import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Comments from '../models/Comments';

const comment = new Comments();

const addcomment = async (req: Request, res: Response) => {
  try {
    const response = await comment.createComment(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'comment added successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

/*
const getAllComments = async (req: Request, res: Response) => {
  try {
    const response = await comment.getAllComments(req.query.post_id as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Retrieved the all Comments successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};
*/
const updateCOmment = async (req: Request, res: Response) => {
  try {
    const response = await comment.updateComment(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Comment updated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};
const removeComment = async (req: Request, res: Response) => {
  try {
    await comment.deleteComment(req.body.user_id, req.body.post_id);
    res.status(200).json({
      status: true,
      message: 'Comment deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const comments_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/post/comment', logger, verifyToken, addcomment);
  // app.get('/post/comments', logger, verifyToken, getAllComments);
  app.delete('/post/comment', logger, verifyToken, removeComment);
};
export default comments_controller_routes;
