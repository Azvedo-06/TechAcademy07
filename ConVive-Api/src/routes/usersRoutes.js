import { Router } from "express";
import { getAllUsers, createUser, deleteUser } from "../controllers/userController.js";
const router = Router();

router.get('/', getAllUsers); // Rota para obter todos os usuários
router.post('/', createUser);
router.delete('/:id', deleteUser);

export default router;