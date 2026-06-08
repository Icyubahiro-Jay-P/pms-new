import express from 'express';
import { createPromotion, getPromotions, updatePromotion, deletePromotion, linkVehicle } from '../controllers/promotionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createPromotion);
router.get('/', authMiddleware, getPromotions);
router.put('/:id', authMiddleware, updatePromotion);
router.delete('/:id', authMiddleware, deletePromotion);
router.post('/link-vehicle', authMiddleware, linkVehicle);

export default router;
