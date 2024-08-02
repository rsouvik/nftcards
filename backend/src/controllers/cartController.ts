import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { CartItem } from '../models/cartItem';

export const getCartItems = async (req: Request, res: Response) => {
    const cartItemRepository = getRepository(CartItem);
    const cartItems = await cartItemRepository.find();
    res.json(cartItems);
};

export const addCartItem = async (req: Request, res: Response) => {
    const cartItemRepository = getRepository(CartItem);
    const newCartItem = cartItemRepository.create(req.body);
    const result = await cartItemRepository.save(newCartItem);
    res.json(result);
};

export const removeCartItem = async (req: Request, res: Response) => {
    const cartItemRepository = getRepository(CartItem);
    const { id } = req.params;
    const result = await cartItemRepository.delete(id);
    res.json(result);
};
