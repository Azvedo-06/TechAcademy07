import { Router } from 'express';
import { getAllEvents, createEvent, deleteEvent, updateEvent } from '../controllers/eventController.js';

const router = Router();

router.get('/', getAllEvents); // Rota para obter todos os eventos
router.post('/', createEvent); // Rota para criar um novo evento
router.delete('/:id', deleteEvent); // Rota para deletar um evento por ID
router.put('/:id', updateEvent); // Rota para atualizar um evento por ID

export default router;