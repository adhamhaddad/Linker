import { Request, Response, NextFunction, Application } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config';
import token from '../middlewares/token';

const user = new User();

const createUser = async (req: Request, res: Response) => {
  try {
    const response = await user.createUser(req.body);
    const token = jwt.sign({ user: response }, config.token as string);

    res.status(201).json({
      status: true,
      data: { ...response, token },
      message: 'User created successfully!'
    });
    // .redirect('http://localhost:3000/login')
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
    console.log(await req.body.id)
    console.log(await req.body)
    const response = await user.getUser(req.body.id);
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
    const response = await user.authenticate(
      req.body.username,
      req.body.password
    );
    jwt.sign({ user: response }, config.token as string);
    if (!response) {
      return res.status(401).json({
        status: false,
        message: 'Username or password incorrect'
      });
    }
    res.status(200).json({
      status: true,
      data: response,
      message: 'User authenticated successfully!'
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
  app.get('/users', logger, getAllUsers);
  app.get('/user', logger, getUser);
  app.patch('/user', logger, updateUser);
  app.delete('/user', logger, deleteUser);
  app.post('/authenticate', logger, authenticate);
};
export default user_controller_routes;
