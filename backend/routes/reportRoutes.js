import express from 'express';
import Customer from '../models/Customer.js';
import Vehicle from '../models/Vehicle.js';
import PromotionVehicle from '../models/PromotionVehicle.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        // Find all customers
        const customers = await Customer.find({});
        const report = [];

        for (const customer of customers) {
            // Find vehicles registered by the same user
            const vehicles = await Vehicle.find({ User_ID: customer.User_ID });
            
            for (const vehicle of vehicles) {
                // Find promotions for this vehicle
                const promoLinks = await PromotionVehicle.find({ Plate_Number: vehicle.Plate_Number }).populate('Promotion_ID');
                
                if (promoLinks.length === 0) continue;

                for (const link of promoLinks) {
                    if (!link.Promotion_ID) continue; // In case promotion was deleted

                    report.push({
                        CustomerName: `${customer.FirstName} ${customer.LastName}`,
                        VehicleBrand: vehicle.Brand,
                        PromotionTitle: link.Promotion_ID.Title,
                        DiscountValue: link.Promotion_ID.Discount_Value,
                        Performance: link.Performance
                    });
                }
            }
        }

        res.json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
