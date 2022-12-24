import { Request, Response, NextFunction, Application } from 'express';
import { commentUpload } from '../middlewares/imagesHandler';
import verifyToken from '../middlewares/verifyToken';
import CommentReply from '../models/CommentReply';
import { io } from '../server';

const reply = new CommentReply();

const createReply = async (req: Request, res: Response) => {
  try {
    const replyData = {
      comment_id: req.body.comment_id as string,
      user_id: req.body.user_id as string,
      reply_caption: req.body.reply_caption,
      reply_img: req.file?.path as string,
      reply_video: req.file?.path as string
    };
    const response = await reply.createReply(replyData);
    io.emit('comment_replies', {
      action: 'CREATE_REPLY',
      data: { ...response }
    });
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Reply created successuflly!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getReplies = async (req: Request, res: Response) => {
  try {
    const response = await reply.getReplies(req.query.comment_id as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Replies recieved successuflly!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateReply = async (req: Request, res: Response) => {
  try {
    const replyData = {
      comment_id: req.body.comment_id as string,
      user_id: req.body.user_id as string,
      reply_caption: req.body.reply_caption,
      reply_img: req.file?.path as string,
      reply_video: req.file?.path as string
    };
    const response = await reply.createReply(replyData);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Reply updated successuflly!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deleteReply = async (req: Request, res: Response) => {
  try {
    const response = await reply.createReply(req.body);
    io.emit('comment_replies', {
      action: 'DELETE_REPLY',
      data: { ...response }
    });
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Reply deleted successuflly!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const comment_reply_routes_controller = (
  app: Application,
  logger: NextFunction
) => {
  app.post(
    '/comment-reply',
    logger,
    verifyToken,
    commentUpload.single('reply_img'),
    createReply
  );
  app.get('/comment-reply', logger, verifyToken, getReplies);
  app.patch(
    '/comment-reply',
    logger,
    verifyToken,
    commentUpload.single('reply_img'),
    updateReply
  );
  app.delete('/comment-reply', logger, verifyToken, deleteReply);
};
export default comment_reply_routes_controller;
