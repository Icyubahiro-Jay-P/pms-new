import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    const { UserName, Password, Role } = req.body;
    try {
        const userExists = await User.findOne({ UserName });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        const user = await User.create({ UserName, Password: hashedPassword, Role });
        res.status(201).json({ message: 'User created successfully', user: { _id: user._id, UserName: user.UserName, Role: user.Role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const login = async (req, res) => {
    const { UserName, Password } = req.body;
    try {
        const user = await User.findOne({ UserName });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ _id: user._id, Role: user.Role }, process.env.JWT_SECRET || 'super_secret_key_swiftwheels_2026', { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
        res.json({ message: 'Logged in successfully', user: { _id: user._id, UserName: user.UserName, Role: user.Role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.json({ message: 'Logged out successfully' });
};
