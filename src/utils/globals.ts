import * as dotenv from 'dotenv';
dotenv.config();

const globalEnvs = {
  JWT_SECRET: process.env.JWT_SECRET || '',
  MONGODB_URI: process.env.MONGODB_URI || '',
};

export default globalEnvs;
