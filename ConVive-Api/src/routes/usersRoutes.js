import { Router } from "express";
import { getAllUsers, createUser, deleteUser, updateUsers } from "../controllers/usersController.js";
const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUsers)

export default router;