import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Shares from '../models/Share';

const share = new Shares();

const addShare = async (req: Request, res: Response) => {
  try {
    const response = await share.createShare(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Post shared successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getAllShares = async (req: Request, res: Response) => {
  try {
    const response = await share.getAllShares(req.query.post_id as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Retrieved the all shares successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const removeSshare = async (req: Request, res: Response) => {
  try {
    await share.deleteShare(req.body);
    res.status(200).json({
      status: true,
      message: 'share deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const shares_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/post/share', logger, verifyToken, addShare);
  app.get('/post/shares', logger, verifyToken, getAllShares);
  app.delete('/post/share', logger, verifyToken, removeSshare);
};
export default shares_controller_routes;
