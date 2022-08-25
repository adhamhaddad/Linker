import express, { Application, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import logger from "./middlewares/logger";
import information_controllers_routes from "./controllers/Information";
import posts_controllers_routes from './controllers/Posts';
import user_controllers_routes from "./controllers/Person";
import reactions_controllers_routes from "./controllers/Reactions";
import server_controllers_routes from "./controllers/Server";
// Express App
const app: Application = express();
export const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
app.use(rateLimit({
    windowMs: 60 * 1000, // 60 seconds
    max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many error. try again with different password or email after 60 seconds'
}))
// app.use(express.static(path.resolve(__dirname, '../frontend/build', 'index.html')));
app.use(express.static('public'));

// Express Handler
user_controllers_routes(app, logger as NextFunction);
information_controllers_routes(app, logger as NextFunction);
posts_controllers_routes(app, logger as NextFunction);
reactions_controllers_routes(app, logger as NextFunction);
server_controllers_routes(app, logger as NextFunction);

// Express Server
app.listen(port, () => console.log(`Server Listening on http://127.0.0.1:${port}`));

export default app;