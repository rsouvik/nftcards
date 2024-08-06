import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import {CartItem, NFT} from "../types";
import axios from 'axios';

/*const Cart: React.FC = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    if (cart.length === 0) {
        return <div>Your cart is empty</div>;
    }

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        <img src={item.image_url} alt={item.name} width={50} height={50} />
                        <span>{item.name}</span>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

                            <button onClick={() => removeFromCart(item.item_id)}>Remove</button>

export default Cart;*/

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { cart, removeFromCart } = useContext(CartContext);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get<CartItem[]>('/api/cart');
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError('Could not fetch cart items');
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <img src={item.item_image_url} alt={item.item_name} width={50} height={50} />
                            <h3>{item.item_name}</h3>
                            <p>{item.item_description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;

