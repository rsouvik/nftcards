import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import './database';  // Ensures database connection is established
import cartRoutes from './routes/cart';
import nftRoutes from './routes/nfts';

const app = express();
app.use(cookieParser());

// Extend the Request interface to include sessionId
export interface CustomRequest extends Request {
  sessionId?: string;
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware to handle session
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  console.log(`Cookie is : ${req.cookies.toString()}`);
  let sessionId = req.cookies.sessionId;
  console.log(`Session id is : ${req.cookies.sessionId}`);

  if (!sessionId) {
    sessionId = uuidv4();
    res.cookie('sessionId', sessionId, { httpOnly: true });
  }

  req.sessionId = sessionId;
  next();
});

app.use('/api/cart', cartRoutes);
app.use('/api', nftRoutes);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});