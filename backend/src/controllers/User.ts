import { Request, Response, NextFunction, Application } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Passwords from '../models/Password';
import config from '../configs';
import verifyToken from '../middlewares/verifyToken';
import nodemailer from 'nodemailer';

const user = new User();
const passwords = new Passwords();

const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);

const createUser = async (req: Request, res: Response) => {
  try {
    const response = await user.createUser(req.body, req.body);
    await passwords.createPassword({ ...response, ...req.body.password });
    const token = jwt.sign({ response }, config.token as string);
    res.status(201).json({
      status: true,
      data: { ...response, token },
      message: 'User created successfully!'
    });
    transporter.sendMail(
      {
        to: response.email,
        from: 'socialnetwork.linker@gmail.com',
        subject: 'Signup succeeded',
        text: 'Thank you for using Linker',
        html: '<h1>Welcome to our community!</h1>'
      },
      (err, info) => err && console.log(err.message)
    );
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
    const response = await user.getUser(req.query.username as string);
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
const getUserAccount = async (req: Request, res: Response) => {
  try {
    const response = await user.getUserAccount(req.query.username as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'User account retrieved successfully!'
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
      req.body.query.split(' ')[1],
      req.body.user_id
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
const deleteUser = async (req: Request, res: Response) => {
  try {
    await user.deleteUser(req.body.user_id);
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

const user_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/users', logger, createUser);
  app.get('/users', logger, verifyToken, getUser);
  app.get('/users', logger, verifyToken, getAllUsers);
  app.patch('/users', logger, verifyToken, updateUser);
  app.delete('/users', logger, verifyToken, deleteUser);
  app.get('/user-account', logger, verifyToken, getUserAccount);
  app.post('/search', logger, verifyToken, searchByName);
  app.post('/search/:username', logger, verifyToken, searchByUsername);
};
export default user_controller_routes;
