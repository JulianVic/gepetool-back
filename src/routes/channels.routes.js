import { Router } from 'express';
import userController from '../controllers/channel.controllers.js';

const router = Router();

router.post('/create', userController.createChannel);
router.get('/get', userController.getChannels);

export default router;