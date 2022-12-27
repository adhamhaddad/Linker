import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Message from '../models/Message';
import { io } from '../server';

const message = new Message();

const newMessage = async (req: Request, res: Response) => {
  try {
    const response = await message.newMessage(
      req.body.sender_username as string,
      req.body.receiver_username as string,
      req.body.content
    );
    io.emit('messages', { action: 'NEW_MESSAGE', data: response });
    res.status(201).json({
      status: true,
      data: response,
      message: 'Message sent successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getAllMessages = async (req: Request, res: Response) => {
  try {
    const response = await message.getAllMessages(
      req.query.sender_username as string,
      req.query.receiver_username as string
    );
    res.status(200).json({
      status: true,
      data: response,
      message: 'Messages received successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getMessagesList = async (req: Request, res: Response) => {
  try {
    const response = await message.getMessagesList(
      req.query.sender_id as string,
      req.query.receiver_id as string
    );
    res.status(200).json({
      status: true,
      data: response,
      message: 'Messages received successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateMessage = async (req: Request, res: Response) => {
  try {
    const response = await message.updateMessage(req.body, req.params.id);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Message updated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    const response = await message.deleteMessage(
      req.body.sender_username,
      req.body.receiver_username,
      req.body.message_id
    );
    io.emit('messages', { action: 'DELETE_MESSAGE', data: response });
    res.status(200).json({
      status: true,
      message: 'Message deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const messages_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/messages', logger, verifyToken, newMessage);
  app.get('/messages', logger, verifyToken, getAllMessages);
  app.get('/user/all-messages', logger, getMessagesList);
  app.patch('/messages', logger, verifyToken, updateMessage);
  app.delete('/messages', logger, verifyToken, deleteMessage);
};
export default messages_controller_routes;
