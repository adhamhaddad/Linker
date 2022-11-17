import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import config from '../configs';
import Passwords from '../models/Password';
import jwt from 'jsonwebtoken';

const password = new Passwords();

/*
const createPassword = async (req: Request, res: Response) => {
  try {
    const response = await password.createPassword();
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
*/

const resetPassword = async (req: Request, res: Response) => {
  try {
    const response = await password.resetPassword(req.body);
    res.status(201).json({
      status: true,
      message: 'Password changed successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const authenticate = async (req: Request, res: Response) => {
  const bodyData = Object.keys(req.body)[0];
  try {
    const response = await password.authenticate(req.body, req.body.current_password);
    const token = jwt.sign({ response }, config.token as string);
    if (!response) {
      return res.status(400).json({
        status: false,
        message: `${bodyData} doesn't exist`
      });
    }
    res.status(200).json({
      status: true,
      data: { user: { ...response }, token },
      message: 'User authenticated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};
const password_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/authenticate', logger, authenticate);
  app.patch('/password/change', logger, verifyToken, resetPassword);
  app.patch('/password/reset', logger, verifyToken, resetPassword);
};
export default password_controller_routes;
