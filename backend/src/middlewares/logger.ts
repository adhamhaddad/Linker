import { Request, Response, NextFunction } from 'express';
import { port } from '../server';

function logger(req: Request, _res: Response, next: NextFunction) {
    try {
        console.log(`Method: ${req.method} - ${req.protocol}://${req.hostname}:${port}${req.originalUrl}`);
        next();
    } catch (err) {
        next(err);
    }
}

export default logger;