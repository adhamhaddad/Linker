import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization as string;
    const token = authorization?.split(' ')[1];
    fs.readFile(
      path.join(__dirname, '..', '..', 'keys', 'public.key'),
      { encoding: 'utf8' },
      (err, privateKey) => {
        if (err) err;
        const decode = jwt.verify(token, privateKey);
        if (decode) next();
      }
    );
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
