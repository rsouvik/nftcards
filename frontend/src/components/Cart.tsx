import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Cart: React.FC = () => {
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

export default Cart;