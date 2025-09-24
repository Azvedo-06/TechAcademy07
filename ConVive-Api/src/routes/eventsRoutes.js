import { Router } from 'express';
import { getAllEvents } from '../controllers/eventController.js';

const router = Router();

router.get('/', getAllEvents); // Rota para obter todos os eventos

export default router;