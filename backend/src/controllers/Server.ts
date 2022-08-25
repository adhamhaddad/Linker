import { Request, Response, NextFunction, Application } from 'express';
import path from "path";
import token from '../middlewares/token';

// Register, Login
const register = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../public/register.html"));
}
const login = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../public/login.html"));
}

// Main, Home, Profile
const main = (_req: Request, res: Response) => {
    res
    .status(200)
    .send("Connecting Done!");
};
const home = (_req: Request, res: Response) => {
    res
    .status(200)
    .sendFile(path.join(__dirname, "../../../public/index"))
};
const profile = (_req: Request, res: Response) => {
    res
    .status(200)
    .sendFile(path.join(__dirname, "../../../public/profile"))
};

// Notifications, Messages
const notifications = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/home"));
}
const messages = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/home"));
}

// About, Contact
const about = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/about"))
};
const contact = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/about"))
};

// Redirect Routes
const redirectRegister = (_req: Request, res: Response) => {
    res.redirect('/profile_user')
}

const redirectLogin = (_req: Request, res: Response) => {
    res.redirect('/profile_user')
};

const server_controllers_routes = (app: Application, logger: NextFunction) => {
    app.get('/register', logger, register);
    app.get('/login', logger, login);
    app.get('/', logger, token, main);
    app.get('/home', logger, token, home);
    app.get('/profile', logger, token, profile);
    app.get('/messages', logger, token, messages);
    app.get('/notifications', logger, token, notifications);
    app.get('/about', logger, token, about)
    app.get('/contact', logger, token, contact)

    app.post('/login', logger, )
    app.post('/register', logger, )
}
export default server_controllers_routes;