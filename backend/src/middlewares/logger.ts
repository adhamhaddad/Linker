import { Request, Response, NextFunction } from 'express';
import { port } from '../server';

async function logger (req: Request, _res: Response, next: NextFunction): Promise<void> {
    try {
        console.log(`Method: ${req.method} - ${req.protocol}://${req.hostname}:${port}${req.originalUrl}`);
        next();
    } catch (err) {
        throw new Error(`Error Occurred. ${err}`);
    }
}

export default logger;