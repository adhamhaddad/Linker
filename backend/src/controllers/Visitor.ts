import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Visitor from '../models/Visitor';
import { io } from '../server';

const visitor = new Visitor();

const createVisitor = async (req: Request, res: Response) => {
  try {
    const response = await visitor.createVisitor(req.body);
    io.emit('visits', { action: 'CREATE_VISIT', data: { ...response } });
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Visitor created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getVisitors = async (req: Request, res: Response) => {
  try {
    const response = await visitor.getVisitors(req.query.username as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Visitor received successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getVisited = async (req: Request, res: Response) => {
  try {
    const response = await visitor.getVisited(req.query.username as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Visited received successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const visitor_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/visitors', logger, verifyToken, createVisitor);
  app.get('/visitors', logger, verifyToken, getVisitors);
  app.get('/visited', logger, verifyToken, getVisited);
};
export default visitor_controller_routes;
