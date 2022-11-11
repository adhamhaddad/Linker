import { Request, Response, NextFunction } from 'express';
import { port } from '../server';

const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(
    `Method: ${req.method} - ${req.protocol}://${req.hostname}:${port}${req.originalUrl}`
  );
  next();
};

export default logger;
