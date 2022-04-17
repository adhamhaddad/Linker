import express, { Application } from "express";
import helmet from "helmet";
import morgan from 'morgan';
import handler from './routes/handler';

// Express App
const app: Application = express();
const port: number = 3000;


// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(morgan('short'))
app.use(express.urlencoded({extended: false}));

// Express Handler
app.use('/', handler)

// Express Server
app.listen(port, () => console.log(`Server running at port ${port}`));

export default app;