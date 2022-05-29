import { Router } from 'express';
import router from './api/router';
import logger from '../middlewares/logger';

const handler = Router();

handler.use('/api', logger, router);

export default handler;