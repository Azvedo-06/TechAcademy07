import { Router } from "express";
import { getAllUsers, createUser } from "../controllers/userController.js";
const router = Router();

router.get('/', getAllUsers); // Rota para obter todos os usuários
router.post('/', createUser)

export default router;