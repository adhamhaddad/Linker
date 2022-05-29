import { Request, Response, NextFunction } from 'express';

async function logger(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log(`Request: ${req.method} ${req.url}`);
        next();

    } catch (err) {
        throw new Error(`Could not log Error. ${err}`);
    }
}

export default logger;