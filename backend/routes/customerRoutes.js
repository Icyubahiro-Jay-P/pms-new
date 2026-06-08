import express from 'express';
import Customer from '../models/Customer.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
        const customer = await Customer.create({ ...req.body, User_ID: req.user._id });
        res.status(201).json(customer);
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
                    { FirstName: { $regex: search, $options: 'i' } },
                    { LastName: { $regex: search, $options: 'i' } },
                    { Email: { $regex: search, $options: 'i' } }
                ]
            };
        }
        const customers = await Customer.find(query).populate('User_ID', 'UserName');
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Customer removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
