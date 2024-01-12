import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';
import globalEnvs from '../../utils/globals';

interface CreateUserInput {
    username: string;
    password: string;
}

export const createUser = async (userData: CreateUserInput): Promise<IUser> => {
    const user = new User(userData);
    await user.save();
    return user;
};

export const authenticateUser = async (username: string, password: string): Promise<string> => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, globalEnvs.JWT_SECRET);
    return token;
};

export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find({});
};
