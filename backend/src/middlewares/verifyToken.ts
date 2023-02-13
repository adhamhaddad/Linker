import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import configs from '../configs';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization as string;
    const token = authorization.split(' ')[1];
    const decode = jwt.verify(token, configs.token as string);
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

export const checkToken = (req: Request, res: Response) => {
  try {
    const token = req.query.accessToken;
    console.log(token)
    const decode = jwt.verify(token as string, configs.token as string);
    if (decode) {
      return res.status(200).json({
        data: { status: true }
      });
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
