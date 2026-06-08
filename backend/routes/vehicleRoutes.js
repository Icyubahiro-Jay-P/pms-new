import express from 'express';
import Vehicle from '../models/Vehicle.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
        const vehicle = await Vehicle.create({ ...req.body, User_ID: req.user._id });
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query = {
                $or: [
                    { Plate_Number: { $regex: search, $options: 'i' } },
                    { Brand: { $regex: search, $options: 'i' } },
                    { Model: { $regex: search, $options: 'i' } }
                ]
            };
        }
        const vehicles = await Vehicle.find(query).populate('User_ID', 'UserName');
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.json({ message: 'Vehicle removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
