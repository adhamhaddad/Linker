import { Request, Response, NextFunction } from 'express';
import path from "path";

export const base = (_req: Request, res: Response) => {
    res.status(200).json({message: "Connecting Done!"});
};

export const home = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/index"))
};

export const profile = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/profile"))
};

export const profile_user = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/profile-port"));
}

export const notifications = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/home"));
}

export const messages = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/home"));
}

export const register = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/register"));
}

export const login = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/login"));
}

export const redirectRegister = (_req: Request, res: Response) => {
    res.redirect('/profile_user')
}

export const redirectLogin = (_req: Request, res: Response) => {
    res.redirect('/profile_user')
};