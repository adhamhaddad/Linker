import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization as string;
    const token = authorization.split(' ')[1];
    const decode = jwt.verify(token, config.token as string);
    if (decode) {
      next();
    }
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message.includes('jwt must be provided')
        ? 'You must login first.'
        : (err as Error).message
    });
  }
};
export default verifyToken;
