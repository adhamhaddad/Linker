import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Theme from '../models/Theme';

const theme = new Theme();

const createTheme = async (req: Request, res: Response) => {
  try {
    const response = await theme.createTheme(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Theme created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getThemes = async (req: Request, res: Response) => {
  try {
    const response = await theme.getThemes(req.query.username as string);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Theme retrieved successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const theme_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/theme', logger, verifyToken, createTheme);
  app.get('/theme', logger, verifyToken, getThemes);
  app.patch('/theme', logger, verifyToken, getThemes);
  app.delete('/theme', logger, verifyToken, getThemes);
};
export default theme_controller_routes;
