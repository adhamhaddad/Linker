import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Friend from '../models/Friend';
import { io } from '../server';

const friend = new Friend();

const addFriend = async (req: Request, res: Response) => {
  try {
    const response = await friend.addFriend(req.body);
    io.emit('friends', {
      action: 'FRIEND_REQUEST',
      data: { ...response }
    });
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Friend request sent successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getFriends = async (req: Request, res: Response) => {
  try {
    const response = await friend.getFriends(req.query.username as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Retrieved the all Friends successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};
const checkFriend = async (req: Request, res: Response) => {
  try {
    const response = await friend.checkFriend(
      req.query.sender_id as string,
      req.query.receiver_id as string
    );
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Friend retrieved successfully'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};
const friendRequest = async (req: Request, res: Response) => {
  try {
    const response = await friend.friendRequest(req.query.user_id as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Retrieved Friend successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const acceptFriend = async (req: Request, res: Response) => {
  try {
    const response = await friend.acceptFriend(req.body);
    io.emit('friends', {
      action: 'ACCEPT_REQUEST',
      data: response
    });
    res.status(200).json({
      status: true,
      data: response,
      message: 'Retrieved Friend successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const cancelRequest = async (req: Request, res: Response) => {
  try {
    const response = await friend.deleteFriend(req.body);
    io.emit('friends', { action: 'CANCEL_REQUEST', data: response });
    res.status(200).json({
      status: true,
      data: response,
      message: 'Friend deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const ignoreRequest = async (req: Request, res: Response) => {
  try {
    const response = await friend.deleteFriend(req.body);
    io.emit('friends', { action: 'IGNORE_REQUEST', data: response });
    res.status(200).json({
      status: true,
      data: response,
      message: 'Friend deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deleteFriend = async (req: Request, res: Response) => {
  try {
    const response = await friend.deleteFriend(req.body);
    io.emit('friends', { action: 'DELETE_FRIEND', data: response });
    res.status(200).json({
      status: true,
      data: response,
      message: 'Friend deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const friends_controller_routes = (app: Application, logger: NextFunction) => {
  app.get('/user/friends', logger, verifyToken, getFriends);
  app.get('/requests', logger, verifyToken, friendRequest);
  app.get('/friend-check', logger, verifyToken, checkFriend);
  app.post('/add-friend', logger, verifyToken, addFriend);
  app.patch('/accept-request', logger, verifyToken, acceptFriend);
  app.delete('/cancel-request', logger, verifyToken, cancelRequest);
  app.delete('/ignore-request', logger, verifyToken, ignoreRequest);
  app.delete('/delete-friend', logger, verifyToken, deleteFriend);
};
export default friends_controller_routes;
