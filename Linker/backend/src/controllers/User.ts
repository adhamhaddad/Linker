import { Request, Response, NextFunction, Application } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config';
import verifyToken from '../middlewares/verifyToken';
import searchValidation from '../middlewares/searchHandler';

const user = new User();

const createUser = async (req: Request, res: Response) => {
  try {
    const response = await user.createUser(req.body);
    const token = jwt.sign({ response }, config.token as string);
    res.status(201).json({
      status: true,
      data: { ...response, token },
      message: 'User created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const response = await user.getAllUsers();
    res.status(200).json({
      status: true,
      data: response,
      message: 'User retrieved successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const response = await user.getUser(req.query.user_id as string);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'User retrieved successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const response = await user.updateUser(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'User updated successfully!'
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
    await user.resetPassword(req.body);
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    await user.deleteUser(req.body.id);
    res.status(200).json({
      status: true,
      message: 'User deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const response = await user.authenticate(req.body);
    const token = jwt.sign({ response }, config.token as string);
    if (!response) {
      return res.status(400).json({
        status: false,
        message: 'Username or password incorrect'
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

const searchByUsername = async (req: Request, res: Response) => {
  try {
    const response = await user.searchByUsername(req.body);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Users fetched successfully'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const searchByName = async (req: Request, res: Response) => {
  try {
    const response = await user.searchByName(
      req.body.query.split(' ')[0],
      req.body.query.split(' ')[1]
    );
    res.status(200).json({
      status: true,
      data: response,
      message: 'Users fetched successfully'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const user_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/user', logger, createUser);
  app.get('/users', logger, verifyToken, getAllUsers);
  app.get('/user', logger, verifyToken, getUser);
  app.patch('/user', logger, verifyToken, updateUser);
  app.patch('/user/reset', logger, verifyToken, resetPassword);
  app.delete('/user', logger, verifyToken, deleteUser);
  app.post('/authenticate', logger, authenticate);
  // app.post('/search', logger, searchByUsername);
  app.post('/search', logger, searchByName);
};
export default user_controller_routes;
