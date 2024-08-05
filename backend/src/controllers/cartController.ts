import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { CartItem } from '../models/cartItem';
import { db } from '../database';

export const getCartItems = async (req: Request, res: Response) => {
    const cartItemRepository = getRepository(CartItem);
    const cartItems = await cartItemRepository.find();
    res.json(cartItems);
};

/*export const addCartItem = async (req: Request, res: Response) => {
    const cartItemRepository = getRepository(CartItem);
    const newCartItem = cartItemRepository.create(req.body);
    const result = await cartItemRepository.save(newCartItem);
    res.json(result);
};*/

// Add item to cart
export const addCartItem = async (req: Request, res: Response) => {
    const { itemId, itemName, itemDescription, itemImageUrl } = req.body;
    const sessionId = req.sessionId;

    try {
        await db.query(
            'INSERT INTO cart_items (session_id, item_id, item_name, item_description, item_image_url) VALUES ($1, $2, $3, $4, $5)',
            [sessionId, itemId, itemName, itemDescription, itemImageUrl]
        );
        res.status(201).send('Item added to cart');
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Error adding item to cart' });
    }
});

export const removeCartItem = async (req: Request, res: Response) => {
    const cartItemRepository = getRepository(CartItem);
    const { id } = req.params;
    const result = await cartItemRepository.delete(id);
    res.json(result);
};
