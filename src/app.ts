import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './api/routes/userRoutes';
import globalEnvs from './utils/globals';
import pokemonRoutes from './api/routes/pokemonRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();
app.use(express.json());

mongoose.connect(globalEnvs.MONGODB_URI as string)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/users', userRoutes);
app.use('/pokemon', pokemonRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
