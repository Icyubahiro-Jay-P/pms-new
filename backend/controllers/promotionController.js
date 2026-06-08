import Promotion from '../models/Promotion.js';
import PromotionVehicle from '../models/PromotionVehicle.js';

export const createPromotion = async (req, res) => {
    try {
        const promotion = await Promotion.create({ ...req.body, User_ID: req.user._id });
        res.status(201).json(promotion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find({}).populate('User_ID', 'UserName');
        res.json(promotions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(promotion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePromotion = async (req, res) => {
    try {
        await Promotion.findByIdAndDelete(req.params.id);
        await PromotionVehicle.deleteMany({ Promotion_ID: req.params.id });
        res.json({ message: 'Promotion removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const linkVehicle = async (req, res) => {
    try {
        const link = await PromotionVehicle.create(req.body);
        res.status(201).json(link);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
