import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Information from '../models/Information';

const info = new Information();

const createInfo = async (req: Request, res: Response) => {
  try {
    const response = await info.createInfo(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'information created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getInfo = async (req: Request, res: Response) => {
  try {
    const response = await info.getInfo(req.query.username as string);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Retrieved the information successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateInfo = async (req: Request, res: Response) => {
  try {
    const response = await info.updateInfo(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Information updated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};
const deleteInfo = async (req: Request, res: Response) => {
  try {
    const response = await info.deleteInfo(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Story uploaded successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};
const information_controller_routes = (
  app: Application,
  logger: NextFunction
) => {
  app.post('/information', logger, verifyToken, createInfo);
  app.get('/information', logger, verifyToken, getInfo);
  app.patch('/information', logger, verifyToken, updateInfo);
  app.patch('/delete-information', logger, verifyToken, deleteInfo);
};
export default information_controller_routes;
