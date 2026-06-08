import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    Plate_Number: { type: String, required: true, unique: true },
    Brand: { type: String, required: true },
    Model: { type: String, required: true },
    Year: { type: Number, required: true },
    Vehicle_Type: { type: String, required: true },
    Purchase_Price: { type: Number, required: true },
    Status: { type: String, required: true, default: 'Available' },
    User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Vehicle', vehicleSchema);
