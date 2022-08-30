import express, { Application, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import logger from './middlewares/logger';
import user_controller_routes from './controllers/Person';
import information_controller_routes from './controllers/Information';
import posts_controller_routes from './controllers/Posts';
import reactions_controller_routes from './controllers/Reactions';
import server_controller_routes from './controllers/Server';
import photos_controller_routes from './controllers/Photos';
import config from './config';
import cors from 'cors';
import links_controller_routes from './controllers/Links';
import messages_controller_routes from './controllers/Messages';
// Express App
const app: Application = express();
export const port = config.port || 8080;

const corsOptions = {
  origin: 'http://localhost:4000',
  optionsSucessStatus: 200,
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

// Express Handler
user_controller_routes(app, logger as NextFunction);
photos_controller_routes(app, logger as NextFunction);
information_controller_routes(app, logger as NextFunction);
posts_controller_routes(app, logger as NextFunction);
reactions_controller_routes(app, logger as NextFunction);
server_controller_routes(app, logger as NextFunction);
links_controller_routes(app, logger as NextFunction);
messages_controller_routes(app, logger as NextFunction);
// Express Server
app.listen(port, () => {
  console.log(`Backend server is listening on ${config.port}`);
  console.log(`Frontend server is running on ${config.url}`);
  console.log(`press CTRL+C to stop server`);
});

export default app;
