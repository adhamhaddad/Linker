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
import config from './config';
import os from 'os';

// import { Server } from 'socket.io';
// import http from 'http';

// Express App
const app: Application = express();
export const port = config.port || 8080;
const ip = os.networkInterfaces()['wlan0']?.[0].address;

const corsOptions = {
  origin: '*',
  optionsSucessStatus: 200,
  methods: 'GET, HEAD, PUT, PATCH, DELETE, POST'
};
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
// app.use(rateLimit({
//     windowMs: 30 * 1000, // 30 seconds
//     max: 10, // Limit each IP to 100 requests per `window`
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//     message: 'Too many requests. try again with different email or password after 30 seconds'
// }))
app.use(cors(corsOptions));

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
// Express Server

/*
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions
});

const CHAT_BOT = 'ChatBot';
let chatRoom = '';
let all_users: any = [];
let chatRoomUsers: any = [];

io.on('connection', (socket) => {
  console.log('User connected', socket.id);
  socket.on('join-chat', (data) => {
    const { username, chat } = data;
    socket.join(chat);

    let createdTime = Date.now();
    socket.to(chat).emit('receive_message', {
      message: `${username}`,
      username: CHAT_BOT,
      createdTime
    });

    socket.emit('receive_message', {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      createdTime
    });

    chatRoom = chat;
    all_users.push({ id: socket.id, username, chat });
    chatRoomUsers = all_users.filter((user: any) => user.chat === chat);
    socket.to(chat).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  });
});
*/

app.listen(port, () => {
  console.log(`Backend server is listening on http://${ip}:${config.port}`);
  console.log(`press CTRL+C to stop the server`);
});

export default app;
