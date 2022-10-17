import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Friend from '../models/Friends';

const friend = new Friend();

const addFriend = async (req: Request, res: Response) => {
  try {
    const response = await friend.addFriend(req.body);
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
    const response = await friend.getFriends(req.query.user_id as string);
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
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Retrieved Friend successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const ignoreFriend = async (req: Request, res: Response) => {
  try {
    const response = await friend.ignoreFriend(req.body);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Retrieved Friend successfully!'
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
    await friend.deleteFriend(req.body);
    res.status(200).json({
      status: true,
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
  app.post('/user/friend', logger, verifyToken, addFriend);
  app.get('/user/friend', logger, verifyToken, friendRequest);
  app.patch('/user/friend', logger, verifyToken, acceptFriend);
  // app.patch('/user/friend', logger, verifyToken, ignoreFriend);
  app.get('/user/friends', logger, verifyToken, getFriends);
  app.delete('/user/friend', logger, verifyToken, deleteFriend);
};
export default friends_controller_routes;
