import { Router } from "express";
import { getAllInformative, createInformative, deleteInformative, updateInformatives } from "../controllers/informativeController.js";

const router = Router();

router.get("/", getAllInformative);
router.post("/", createInformative);
router.delete("/:id", deleteInformative);
router.put('/id', updateInformatives);

export default router;