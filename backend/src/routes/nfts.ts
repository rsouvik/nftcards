// backend/src/routes/nfts.ts

import express from 'express';
import axios from 'axios';

const router = express.Router();

// Define the OpenSea API URL
//const OPENSEA_API_URL = 'https://api.opensea.io/api/v1/assets'; //https://api.opensea.io/api/v2/collections
const OPENSEA_API_URL = 'https://api.opensea.io/api/v2/collections?chain=ethereum';

// Endpoint to fetch NFTs
router.get('/nfts', async (req, res) => {

    console.log('OpenSea API Key:', process.env.OPENSEA_API_KEY);

    try {
        const response = await axios.get(OPENSEA_API_URL, {
            params: {
                order_direction: 'desc',
                offset: 0,
                limit: 1,
            },
            headers: {accept: 'application/json','X-API-KEY': process.env.OPENSEA_API_KEY, // Optional API key
            },
        });

        // Transform and send data back to the client
        const nfts = response.data.assets.map((asset: any) => ({
            id: asset.id,
            name: asset.name,
            description: asset.description,
            image_url: asset.image_url,
        }));

        res.json(nfts);
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
