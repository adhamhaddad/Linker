import express, { Application, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import logger from './middlewares/logger';
import user_controller_routes from './controllers/User';
import information_controller_routes from './controllers/Information';
import posts_controller_routes from './controllers/Posts';
import server_controller_routes from './controllers/Server';
import messages_controller_routes from './controllers/Messages';
import friends_controller_routes from './controllers/Friends';
import likes_controller_routes from './controllers/Likes';
import comments_controller_routes from './controllers/Comments';
import shares_controller_routes from './controllers/Shares';
import password_controller_routes from './controllers/Passwords';
import profile_controller_routes from './controllers/Picture';
import config from './config';
import os from 'os';
import path from 'path';
import { Server } from 'socket.io';

// Express App
const app: Application = express();
export const port = config.port || 8080;
const ip = os.networkInterfaces()['wlan0']?.[0].address;

export const corsOptions = {
  origin: '*',
  optionsSucessStatus: 200,
  methods: 'GET, POST, PATCH, DELETE, HEAD, PUT'
};
const UPLOADS = path.join(__dirname, '..', 'uploads/profile-pictures');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors(corsOptions));
app.use('/uploads/profile-pictures', express.static(UPLOADS));

// app.use(rateLimit({
//     windowMs: 30 * 1000, // 30 seconds
//     max: 10, // Limit each IP to 100 requests per `window`
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//     message: 'Too many requests. try again with different email or password after 30 seconds'
// }))

// Express Requests Handler
user_controller_routes(app, logger as NextFunction);
information_controller_routes(app, logger as NextFunction);
posts_controller_routes(app, logger as NextFunction);
server_controller_routes(app, logger as NextFunction);
messages_controller_routes(app, logger as NextFunction);
friends_controller_routes(app, logger as NextFunction);
likes_controller_routes(app, logger as NextFunction);
comments_controller_routes(app, logger as NextFunction);
shares_controller_routes(app, logger as NextFunction);
password_controller_routes(app, logger as NextFunction);
profile_controller_routes(app, logger as NextFunction);
// Express Server

const server = app.listen(port, () => {
  console.log(`Backend server is listening on http://${ip}:${config.port}`);
  console.log(`press CTRL+C to stop the server`);
});

export const io = new Server(server, {
  cors: corsOptions
});

io.on('connection', (socket) => {
  console.log('User is Connected!');
  socket.on('disconnect', () => {
    console.log('User is disconnected');
  });
});

export default app;
