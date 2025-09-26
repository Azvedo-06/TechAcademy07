import { Router } from "express";
import { getAllAtividades, createAtividade, deleteAtividade } from "../controllers/atividadeController.js";


const router = Router();

router.get('/', getAllAtividades);
router.post('/', createAtividade);
router.delete('/:id', deleteAtividade);

export default router;