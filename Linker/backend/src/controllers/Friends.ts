import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Friend from '../models/Friends';

const friend = new Friend();

const createFriend = async (req: Request, res: Response) => {
  try {
    const response = await friend.newFriend(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Friend added successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getAllFriends = async (req: Request, res: Response) => {
  try {
    const response = await friend.getAllFriends(req.query.user_id as string);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Retrieved the all Friends successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getFriend = async (req: Request, res: Response) => {
  try {
    const response = await friend.getFriend(
      req.query.user_id as string,
      req.query.friend_id as string
    );
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
  app.post('/user/friend', logger, verifyToken, createFriend);
  app.get('/user/friends', logger, verifyToken, getAllFriends);
  app.patch('/user/friend', logger, verifyToken, getFriend);
  app.delete('/user/friend', logger, verifyToken, deleteFriend);
};
export default friends_controller_routes;
