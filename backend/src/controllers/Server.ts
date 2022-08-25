import { Request, Response, NextFunction, Application } from 'express';
import path from "path";

const main = (_req: Request, res: Response) => {
    res.status(200).json({message: "Connecting Done!"});
};

const home = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/index"))
};

const profile = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/profile"))
};

const profile_user = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/profile-port"));
}

const notifications = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/home"));
}

const messages = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/home"));
}

const register = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../public/register.html"));
}

const login = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../public/login.html"));
}

const redirectRegister = (_req: Request, res: Response) => {
    res.redirect('/profile_user')
}

const redirectLogin = (_req: Request, res: Response) => {
    res.redirect('/profile_user')
};

const server_controllers_routes = (app: Application, logger: NextFunction) => {
    app.get('/', logger, main);
    app.get('/home', logger, home);
    app.get('/profile', logger, profile);
    app.get('/login', logger, login);
    app.get('/register', logger, register);
    app.get('/messages', logger, messages);
    app.get('/notifications', logger, notifications);

    app.post('/login', logger, )
    app.post('/register', logger, )
}
export default server_controllers_routes;