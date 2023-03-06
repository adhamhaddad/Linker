import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Password from '../models/Password';

const password = new Password();

const createPassword = async (req: Request, res: Response) => {
  try {
    const response = await password.createPassword(req.body);
    res.status(201).json({
      status: true,
      message: 'Password created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const response = await password.changePassword(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Password changed successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const response = await password.resetPassword(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Password changed successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const password_controller_routes = (app: Application, logger: NextFunction) => {
  app.patch('/password-change', logger, verifyToken, changePassword);
  app.patch('/password-reset', logger, verifyToken, resetPassword);
};
export default password_controller_routes;
