// src/components/NFTCard.tsx

import React, { useContext } from 'react';
import { NFT } from '../types';
import { CartContext } from '../contexts/CartContext';

interface NFTCardProps {
    nft: NFT;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
    const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart(nft);
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
