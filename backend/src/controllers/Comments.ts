import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Comments from '../models/Comment';
import { io } from '../server';

const comment = new Comments();

const createComment = async (req: Request, res: Response) => {
  try {
    const response = await comment.createComment(req.body);
    io.emit('comments', { action: 'CREATE_COMMENT', data: { ...response } });
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

const getAllComments = async (req: Request, res: Response) => {
  try {
    const response = await comment.getAllComments(req.query.post_id as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Retrieved the all comments successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};
const updateComment = async (req: Request, res: Response) => {
  try {
    const response = await comment.updateComment(req.body);
    io.emit('comments', { action: 'UPDATE_COMMENT', data: { ...response } });
    res.status(200).json({
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

const deleteComment = async (req: Request, res: Response) => {
  try {
    const response = await comment.deleteComment(req.body.comment_id);
    io.emit('comments', { action: 'DELETE_COMMENT', data: { ...response } });
    res.status(200).json({
      status: true,
      data: { ...response },
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
  app.post('/comment', logger, verifyToken, createComment);
  app.get('/comments', logger, verifyToken, getAllComments);
  app.patch('/comments', logger, verifyToken, updateComment);
  app.delete('/comment', logger, verifyToken, deleteComment);
};
export default comments_controller_routes;
