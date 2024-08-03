import React, { createContext, useState, ReactNode } from 'react';
import { NFT } from '../types';

interface CartContextProps {
    cart: NFT[];
    addToCart: (nft: NFT) => void;
    removeFromCart: (id: string) => void;
    isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextProps>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    isInCart: () => false,
});

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<NFT[]>([]);

    const addToCart = (nft: NFT) => {
        setCart((prevCart) => [...prevCart, nft]);
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const isInCart = (id: string) => {
        return cart.some((item) => item.id === id);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };