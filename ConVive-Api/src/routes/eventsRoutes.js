import { Router } from 'express';
import { getAllEvents, createEvent } from '../controllers/eventController.js';

const router = Router();

router.get('/', getAllEvents); // Rota para obter todos os eventos
router.post('/', createEvent); // Rota para criar um novo evento

export default router;