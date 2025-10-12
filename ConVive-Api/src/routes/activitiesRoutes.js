import { Router } from "express";
import { getAllActivities, createActivities, deleteActivities, updateActivities } from "../controllers/activitiesController.js";


const router = Router();

router.get('/', getAllActivities);
router.post('/', createActivities);
router.put('/:id', updateActivities);
router.delete('/:id', deleteActivities);

export default router;