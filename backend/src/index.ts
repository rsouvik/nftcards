import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import './database';  // Ensures database connection is established
import cartRoutes from './routes/cart';
import nftRoutes from './routes/nfts';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/cart', cartRoutes);
app.use('/api', nftRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});