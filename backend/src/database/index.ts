/*import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '../ormconfig';

createConnection(config).then(async connection => {
    console.log('Connected to the database');
}).catch(error => console.log('Error connecting to the database', error)); */

import { createConnection, Connection } from 'typeorm';
import config from '../ormconfig';

let connection: Connection | undefined;

export const connectToDatabase = async () => {
    if (!connection) {
        connection = await createConnection(config);
        console.log('Connected to the database');
    }
    return connection;
};
