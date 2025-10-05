import { Router } from "express";
import { getAllActivities, createActivities, deleteActivities } from "../controllers/activitiesController.js";


const router = Router();

router.get('/', getAllActivities);
router.post('/', createActivities);
router.delete('/:id', deleteActivities);

export default router;