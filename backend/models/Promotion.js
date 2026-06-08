import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema({
    Title: { 
        type: String, 
        enum: ['New Year sale', 'Holiday Price Slash', 'Weekend Flash Sale', 'Clearance Discount Offer', 'Seasonal Price Drop'],
        required: true 
    },
    Description: { type: String, required: true },
    Discount_Type: { 
        type: String, 
        enum: ['free', 'percentage', 'FLAT_RATE', 'CASHBACK', 'BUY_ONE_GET_ONE', 'Bundle', 'amount'],
        required: true 
    },
    Discount_Value: { type: Number, required: true },
    Start_Date: { type: Date, required: true },
    End_Date: { type: Date, required: true },
    Status: { type: String, required: true, default: 'Active' },
    User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Promotion', promotionSchema);
