import { Router } from 'express';
import userController from '../controllers/channel.controllers.js';

const router = Router();

router.post('/', userController.createChannel);
router.get('/', userController.getAllChannels);
router.delete('/:id', userController.deteleChannel);

export default router; 