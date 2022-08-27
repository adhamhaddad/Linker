import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const verify = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization as string;
        console.log(authorization)
        const token = authorization.split(' ')[1];
        const decode = jwt.verify(token, config.token as string);
        if(decode) {
            next();
        }
    } catch (err) {
        res.status(400).json({
            status: false,
            message: `Access denied, invalid token ${(err as Error).message}`
        })
    }
}
export default verify;