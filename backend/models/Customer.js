import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    PhoneNumber: { type: String, required: true },
    CreatedAt: { type: Date, default: Date.now },
    Status: { type: String, enum: ['Active', 'Inactive', 'Blocked'], default: 'Active' },
    User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Customer', customerSchema);
