import { Router } from "express";
import { getAllInformativos, createInformativo, deleteInformativo } from "../controllers/informativosController.js";

const router = Router();

router.get("/", getAllInformativos);
router.post("/", createInformativo);
router.delete("/:id", deleteInformativo);

export default router;