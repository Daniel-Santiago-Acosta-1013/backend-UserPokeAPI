import express from 'express';
import connectDB from './config/db';
import userRoutes from './api/routes/userRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

app.use('/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
