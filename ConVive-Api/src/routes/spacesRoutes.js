import { Router } from "express";
import { getAllSpaces, createSpaces, deleteSpaces, updateSpaces } from "../controllers/spacesController.js";

const router = Router();

router.get('/', getAllSpaces);
router.post('/', createSpaces);
router.delete('/:id', deleteSpaces);
router.put('/id', updateSpaces)

export default router;