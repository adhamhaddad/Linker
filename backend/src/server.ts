import express, { Application } from "express";
import helmet from "helmet";
import handler from './routes/handler';
import path from 'path';

// Express App
const app: Application = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
app.use(express.static(path.resolve(__dirname, '../frontend/build', 'index.html')));

// Express Handler
app.use('/', handler)

// Express Server
app.listen(port, () => console.log(`Server Listening on http://127.0.0.1:${port}`));

export default app;