import express from 'express';
import cors, { CorsOptions } from 'cors';
import connectDB from './config/db';
import userRoutes from './api/routes/userRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();

// Lista blanca de dominios
const whitelist: string[] = ['http://localhost:5173'];

// Opciones de CORS
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin ?? '') || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to the database
connectDB();

app.use('/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
