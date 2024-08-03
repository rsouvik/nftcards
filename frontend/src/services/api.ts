// src/services/api.ts

import axios from 'axios';
import { NFT } from '../types';

// Define the base URL of the backend server
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to fetch all available NFTs
export const fetchNFTs = async (): Promise<NFT[]> => {
    try {
        const response = await api.get('/nfts');
        return response.data;
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        throw error;
    }
};

// Function to fetch NFT details by ID
export const fetchNFTById = async (id: string): Promise<NFT> => {
    try {
        const response = await api.get(`/nfts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching NFT with ID ${id}:`, error);
        throw error;
    }
};

// Function to add an NFT to the cart
export const addToCart = async (nftId: string): Promise<void> => {
    try {
        await api.post('/cart', { nftId });
    } catch (error) {
        console.error('Error adding NFT to cart:', error);
        throw error;
    }
};

// Function to remove an NFT from the cart
export const removeFromCart = async (nftId: string): Promise<void> => {
    try {
        await api.delete(`/cart/${nftId}`);
    } catch (error) {
        console.error('Error removing NFT from cart:', error);
        throw error;
    }
};

// Function to fetch the current cart state
export const fetchCart = async (): Promise<NFT[]> => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};
