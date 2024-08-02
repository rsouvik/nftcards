import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '../ormconfig';

createConnection(config).then(async connection => {
    console.log('Connected to the database');
}).catch(error => console.log('Error connecting to the database', error));

