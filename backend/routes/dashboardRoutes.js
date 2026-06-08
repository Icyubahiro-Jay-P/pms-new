import express from 'express';
import Vehicle from '../models/Vehicle.js';
import Customer from '../models/Customer.js';
import Promotion from '../models/Promotion.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const [vehicles, customers, promotions] = await Promise.all([
            Vehicle.countDocuments(),
            Customer.countDocuments(),
            Promotion.countDocuments(),
        ]);
        res.json({ vehicles, customers, promotions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
