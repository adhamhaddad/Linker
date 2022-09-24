import { Request, Response, NextFunction, Application } from 'express';
import token from '../middlewares/token';

// Main, Home, Profile
const main = (_req: Request, res: Response) => {
  res.status(200).send('Connecting Done!');
};

const server_controller_routes = (app: Application, logger: NextFunction) => {
  app.get('/', logger, main);
  app.post('/login', logger);
  app.post('/register', logger);
};
export default server_controller_routes;
