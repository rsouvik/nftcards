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

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './database';  // Ensures database connection is established
import cartRoutes from './routes/cart';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


