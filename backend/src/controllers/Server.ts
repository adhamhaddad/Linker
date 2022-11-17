import { Request, Response, NextFunction, Application } from 'express';
import token from '../middlewares/verifyToken';

// Main, Home, Profile
const main = (_req: Request, res: Response) => {
  res.status(200).send('Connecting Done!');
};
const testImage = (req: Request, res: Response) => {
  console.log(req.body)
  res.status(201).json({
    status: true,
    data: req.body.img,
    message: 'Image uploaded successfully'
  })
}

const server_controller_routes = (app: Application, logger: NextFunction) => {
  app.get('/', logger, main);
  app.post('/login', logger);
  app.post('/register', logger);
  app.post('/test', logger, testImage);
};
export default server_controller_routes;
