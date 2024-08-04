// backend/src/routes/nfts.ts

import express from 'express';
import axios from 'axios';

const router = express.Router();

// Define the OpenSea API URL
//const OPENSEA_API_URL = 'https://api.opensea.io/api/v1/assets'; //https://api.opensea.io/api/v2/collections
const OPENSEA_API_URL = 'https://api.opensea.io/api/v2/collections';

// Define the structure of the expected response data
interface ApiResponse {
    collections: Array<Collection>;
}

// Define a TypeScript interface for the collection data structure
interface Collection {
    id: string;
    collection: string;
    name: string;
    description: string;
    image_url: string;
}

// Endpoint to fetch NFTs
router.get('/nfts', async (req, res) => {

    //console.log('OpenSea API Key:', process.env.OPENSEA_API_KEY);

    try {
        const response = await axios.get<ApiResponse>(OPENSEA_API_URL, {
            headers: {
                accept: 'application/json',
                'x-api-key': process.env.OPENSEA_API_KEY, // Use the same key as in the fetch example
            },
            params: {
                chain: 'ethereum',
                limit: 1,
            },
        });

        console.log('API Response:', response.data); // Debug the full response

        // Check if the response contains the expected data
        if (response.data && response.data.collections) {
            const collections = response.data.collections.map((collection: Collection) => ({
                //id: collection.id,
                id: collection.collection,
                name: collection.name,
                description: collection.description,
                image_url: collection.image_url,
            }));
            res.json(collections);
        } else {
            res.status(404).json({ message: 'No collections found' });
        }
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        res.status(500).json({ message: 'Error fetching NFTs' });
    }

    /*const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-api-key': 'REDACTED'}
    };

    fetch('https://api.opensea.io/api/v2/collections?chain=ethereum&limit=1', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));*/

});

export default router;
