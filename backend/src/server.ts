import express, { Application, json, urlencoded, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { Server } from 'socket.io';
import logger from './middlewares/logger';
import configs from './configs';
import user_controller_routes from './controllers/User';
import information_controller_routes from './controllers/Information';
import posts_controller_routes from './controllers/Posts';
import messages_controller_routes from './controllers/Messages';
import friends_controller_routes from './controllers/Friends';
import likes_controller_routes from './controllers/Likes';
import comments_controller_routes from './controllers/Comments';
import shares_controller_routes from './controllers/Shares';
import password_controller_routes from './controllers/Passwords';
import profile_controller_routes from './controllers/Picture';
import theme_controller_routes from './controllers/Themes';
import visitor_controller_routes from './controllers/Visitor';
import comment_likes_routes_controller from './controllers/CommentLikes';
import comment_reply_routes_controller from './controllers/CommentReplies';

// Express App
const app: Application = express();
const port: number = configs.port || 8080;

const ip =
  os.networkInterfaces()['wlan0']?.[0].address ||
  os.networkInterfaces()['eth0']?.[0].address;

const corsOptions = {
  origin: '*',
  optionsSucessStatus: 200,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD', 'PUT']
};

const UPLOADS = path.join(__dirname, '..', 'uploads');

// Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(
  '/uploads/profile-pictures',
  express.static(`${UPLOADS}/profile-pictures`)
);
app.use('/uploads/post-pictures', express.static(`${UPLOADS}/post-pictures`));
app.use('/uploads/post-videos', express.static(`${UPLOADS}/post-videos`));
app.use(
  '/uploads/comment-pictures',
  express.static(`${UPLOADS}/comment-pictures`)
);
app.use(
  '/uploads/replies-pictures',
  express.static(`${UPLOADS}/replies-pictures`)
);

// Express Requests Handler
user_controller_routes(app, logger as NextFunction);
information_controller_routes(app, logger as NextFunction);
posts_controller_routes(app, logger as NextFunction);
messages_controller_routes(app, logger as NextFunction);
friends_controller_routes(app, logger as NextFunction);
likes_controller_routes(app, logger as NextFunction);
comments_controller_routes(app, logger as NextFunction);
shares_controller_routes(app, logger as NextFunction);
password_controller_routes(app, logger as NextFunction);
profile_controller_routes(app, logger as NextFunction);
theme_controller_routes(app, logger as NextFunction);
visitor_controller_routes(app, logger as NextFunction);
comment_likes_routes_controller(app, logger as NextFunction);
comment_reply_routes_controller(app, logger as NextFunction);
app.use((_req, res) => {
  res.status(404).json({
    status: false,
    message: 'Page not found!'
  });
});

// Express Server
const server = https
  .createServer(
    {
      key: fs.readFileSync(
        path.join(__dirname, '..', 'certificate', 'key.pem')
      ),
      cert: fs.readFileSync(
        path.join(__dirname, '..', 'certificate', 'cert.pem')
      )
    },
    app
  )
  .listen(port, () => {
    console.log(`Backend listening on https://${ip}:${configs.port}`);
    // console.log(`Backend server is listening on ${configs.backend_host}`);
    console.log(`Frontend server is listening on ${configs.fronend_host}`);
    console.log('Press CTRL+C to stop the server.');
  });

const io = new Server(server, {
  cors: corsOptions
});

io.on('connection', (socket) => {
  console.log('User is Connected!');
  socket.on('disconnect', () => {
    console.log('User is disconnected');
  });
});
export { port, corsOptions, io };
export default app;
