import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    UserName: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Role: { type: String, required: true, default: 'user' }
});

export default mongoose.model('User', userSchema);
