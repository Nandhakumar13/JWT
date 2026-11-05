import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import dbConnect from './db/db.js';


const app = express();

app.use(express.json());
dotenv.config();
app.use(cors());

console.log("================ MongoDB URI available:", Boolean(process.env.MONGODB_URI));

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Application startup failed:", error.message);
    process.exit(1);
  }
};

startServer();