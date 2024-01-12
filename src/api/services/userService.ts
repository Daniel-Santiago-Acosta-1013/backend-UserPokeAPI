import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

export const authenticateUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return token;
};

export const getAllUsers = async () => {
    return await User.find({});
};
