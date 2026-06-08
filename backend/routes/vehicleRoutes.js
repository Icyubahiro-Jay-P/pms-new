import express from 'express';
import { createVehicle, getVehicles, updateVehicle, deleteVehicle } from '../controllers/vehicleController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createVehicle);
router.get('/', authMiddleware, getVehicles);
router.put('/:id', authMiddleware, updateVehicle);
router.delete('/:id', authMiddleware, deleteVehicle);

export default router;
