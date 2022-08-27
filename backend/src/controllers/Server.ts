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

const server_controller_routes = (app: Application, logger: NextFunction) => {
    app.get('/register', logger, register);
    app.get('/login', logger, login);
    app.get('/', logger, main);
    app.get('/home', logger, home);
    app.get('/profile', logger, profile);
    app.get('/messages', logger, messages);
    app.get('/notifications', logger, notifications);
    app.get('/about', logger, about)
    app.get('/contact', logger, contact)

    app.post('/login', logger, )
    app.post('/register', logger, )
}
export default server_controller_routes;