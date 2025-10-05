import { Router } from "express";
import { getAllSpaces, createSpaces, deleteSpaces } from "../controllers/spacesController.js";

const router = Router();

router.get('/', getAllSpaces);
router.post('/', createSpaces);
router.delete('/:id', deleteSpaces);

export default router;