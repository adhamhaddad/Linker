import { Router } from 'express';
import router from './api/router';
import logger from '../middlewares/logger';

// Express Router
const handler = Router();

// Express Requests Handler
handler.use('/api', logger, router);

export default handler;
