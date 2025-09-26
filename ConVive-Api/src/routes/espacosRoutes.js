import { Router } from "express";
import { getAllEspacos, createEspaco, deleteEspaco } from "../controllers/espacoController.js";

const router = Router();

router.get('/', getAllEspacos);
router.post('/', createEspaco);
router.delete('/:id', deleteEspaco);

export default router;