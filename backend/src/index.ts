import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import './database';  // Ensures database connection is established
import cartRoutes from './routes/cart';
import nftRoutes from './routes/nfts';

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));

app.use(cors());
app.use(bodyParser.json());

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