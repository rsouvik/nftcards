import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { NFT } from '../types';

interface CartContextProps {
    cart: NFT[];
    addToCart: (nft: NFT) => void;
    removeFromCart: (id: string) => void;
    isInCart: (id: string) => boolean;
}

export const CartContext = createContext<CartContextProps>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    isInCart: () => false,
});

export const CartProvider: React.FC = ({ children }) => {
    const [cart, setCart] = useState<NFT[]>([]);

    // Fetch cart items from the server when the component mounts
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('/api/cart');
                setCart(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCart();
    }, []);

    const addToCart = useCallback(async (item: NFT) => {
        try {
            await axios.post('/api/cart', {
                itemId: item.id,
                itemName: item.name,
                itemDescription: item.description,
                itemImageUrl: item.image_url,
            });
            setCart((prevCart) => [...prevCart, item]);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }, []);

    const removeFromCart = useCallback(async (id: string) => {
        try {
            await axios.delete(`/api/cart/${id}`);
            setCart((prevCart) => prevCart.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    }, []);

    const isInCart = useCallback((id: string) => {
        return cart.some((item) => item.id === id);
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};



/*const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

export { CartContext, CartProvider };*/

/*const CartProvider: React.FC = ({ children }) => {
    const [cart, setCart] = useState<NFT[]>([]);

    const addToCart = useCallback((nft: NFT) => {
        setCart((prevCart) => [...prevCart, nft]);
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }, []);

    const isInCart = useCallback(
        (id: string) => {
            return cart.some((item) => item.id === id);
        },
        [cart]
    );

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};

//export const useCart = () => useContext(CartContext);
export { CartContext, CartProvider } */