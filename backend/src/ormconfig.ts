import { ConnectionOptions } from 'typeorm';
import { CartItem } from './models/cartItem';

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',  // replace with your database host
    port: 5432,         // replace with your database port
    username: 'your_username', // replace with your database username
    password: 'your_password', // replace with your database password
    database: 'nft_cart',      // replace with your database name
    entities: [CartItem],      // add all your entities here
    synchronize: true,         // true in development, false in production
    logging: true,             // enables SQL query logging
};

export default config;
