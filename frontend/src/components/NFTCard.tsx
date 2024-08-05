// src/components/NFTCard.tsx

import React, { useContext } from 'react';
import { NFT } from '../types';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';

interface NFTCardProps {
    nft: NFT;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
    const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

    //update this to use db
    /*const handleAddToCart = () => {
        addToCart(nft);
    };*/

    const handleAddToCart = async () => {
        try {
            await axios.post('/api/cart', {
                itemId: nft.id,
                itemName: nft.name,
                itemDescription: nft.description,
                itemImageUrl: nft.image_url,
            });
            addToCart(nft); // Update local cart state
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleRemoveFromCart = () => {
        removeFromCart(nft.id);
    };

    return (
        <div className="nft-card">
            <img src={nft.image_url} alt={nft.name} />
            <h3>{nft.name}</h3>
            <p>{nft.description}</p>
            {isInCart(nft.id) ? (
                <button onClick={handleRemoveFromCart}>Remove from Cart</button>
            ) : (
                <button onClick={handleAddToCart}>Add to Cart</button>
            )}
        </div>
    );
};

export default NFTCard;
