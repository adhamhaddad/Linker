import express, { Application, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import logger from "./middlewares/logger";
import information_controllers_routes from "./controllers/Information";
import posts_controllers_routes from './controllers/Posts';
import user_controllers_routes from "./controllers/Person";
import reactions_controllers_routes from "./controllers/Reactions";
import server_controllers_routes from "./controllers/Server";
import config from './config';
// Express App
const app: Application = express();
export const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
app.use(rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 10, // Limit each IP to 100 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests. try again with different email or password after 30 seconds'
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
app.listen(port, () => {
    console.log(`Backend server is listening on ${config.port}`);
    console.log(`Frontend server is running on ${config.url}`);
    console.log(`press CTRL+C to stop server`)
});

export default app;