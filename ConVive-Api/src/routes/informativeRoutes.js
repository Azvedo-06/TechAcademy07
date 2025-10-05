import { Router } from "express";
import { getAllInformative, createInformative, deleteInformative } from "../controllers/informativeController.js";

const router = Router();

router.get("/", getAllInformative);
router.post("/", createInformative);
router.delete("/:id", deleteInformative);

export default router;