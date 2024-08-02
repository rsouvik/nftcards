import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import cartRoutes from './routes/cart';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/cart', cartRoutes);

createConnection().then(() => {
  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
  });
}).catch(error => console.log(error));

