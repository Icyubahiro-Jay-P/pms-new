import mongoose from 'mongoose';

const promotionVehicleSchema = new mongoose.Schema({
    Promotion_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', required: true },
    Plate_Number: { type: String, ref: 'Vehicle', required: true },
    Performance: { type: String, required: true }
});

// Compound primary key equivalent
promotionVehicleSchema.index({ Promotion_ID: 1, Plate_Number: 1 }, { unique: true });

export default mongoose.model('Promotion_Vehicle', promotionVehicleSchema);
