import { Router } from 'express';
import router from './api/routes';
import logger from '../middlewares/logger';

// Express Router
const handler = Router();

// Express Requests Handler
handler.use('/', logger, router);

export default handler;
