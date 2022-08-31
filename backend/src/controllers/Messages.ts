import { Request, Response, NextFunction, Application } from 'express';
import Message from '../models/Message';

const message = new Message();

const newMessage = async (req: Request, res: Response) => {
  try {
    const response = await message.newMessage(req.body, req.params.id);
    res.status(201).json({
      status: true,
      data: { ...response },
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
    const response = await message.getAllMessages(req.params.id);
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
    const response = await message.deleteMessage(req.params.id);
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
  app.post('/user/:id/message', logger, newMessage);
  app.get('/user/:id/message', logger, getAllMessages);
  // ! first id for user - second id for message will be deleted or updated
  app.patch('/user/:id/message/:id', logger, updateMessage);
  app.delete('/user/:id/message/:id', logger, deleteMessage);
};
export default messages_controller_routes;
