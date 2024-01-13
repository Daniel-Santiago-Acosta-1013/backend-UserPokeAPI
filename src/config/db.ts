import mongoose from 'mongoose';
import globalEnvs from '../utils/globals';

const connectDB = async () => {
    try {
        await mongoose.connect(globalEnvs.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        if (error instanceof Error) {
            console.error('MongoDB Connection Failed:', error);
        }
    }
};

export default connectDB;
