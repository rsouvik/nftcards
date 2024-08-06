import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { CartItem } from '../models/cartItem';
//import { db } from '../database';
import { createConnection } from 'typeorm';
import {connectToDatabase} from '../database';
import {setTimeout} from "timers";

/*export const getCartItems = async (req: Request, res: Response) => {
    const cartItemRepository = getRepository(CartItem);
    const cartItems = await cartItemRepository.find();
    res.json(cartItems);
};*/

export const sleep = async (waitTime: number) =>
    new Promise(resolve =>
        setTimeout(resolve, waitTime));

const waitASecond = async () => {
    console.log("Hold your horses!");
    await sleep(1000);
    console.log("Release your horses!");
}

// Get cart items
export const getCartItems = async (req: Request, res: Response) => {
    const sessionId = req.cookies.sessionId;
    try {
        const connection = await connectToDatabase();
        //const { rows: cartItems } = await connection.query('SELECT item_name FROM cart_items WHERE session_id = $1', [sessionId]);
        //const result = await connection.query(`SELECT * FROM cart_items WHERE session_id = $1`, [sessionId]);
        //const result = await connection.query(`SELECT * FROM cart_items WHERE session_id = "514179a4-d12c-49b3-a181-2606da396c83"`);
        //const result = await connection.query(`SELECT * FROM cart_items WHERE session_id LIKE '514179a4-d12c-49b3-a181-2606da396c83'`);
        //const { rows: cartItems } = await connection.query('SELECT item_name FROM cart_items');

        //const result = await connection.query('SELECT item_name FROM cart_items')

        await connection.query('SELECT item_name FROM cart_items').then(function (data) {
            if(data.exists) {
                res.json(data.rows);
                console.log('Query results if exists:', data.rows[0].data);
            } else {

                //TODO: insert new user

            }
            console.log('Query results:', data.rows[0].data);
            //const cartItems = result.rows;
            //const numberOfRows = cartItems ? cartItems.length : 0;
            //console.log(`Number of rows retrieved: ${numberOfRows}`);
            //res.json(cartItems);
        }).catch(function(error) {

        });

        //waitASecond();
        //console.log(cartItems[0]);
        //console.log('Query results:', result.rows[0].data);

        //const cartItems = result.rows;
        //const numberOfRows = cartItems ? cartItems.length : 0;
        //console.log(`Number of rows retrieved: ${numberOfRows}`);
        //res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Error fetching cart items' });
    }
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
    const sessionId = req.cookies.sessionId;

    try {
        const connection = await connectToDatabase();
        await connection.query(
            'INSERT INTO cart_items (session_id, item_id, item_name, item_description, item_image_url) VALUES ($1, $2, $3, $4, $5)',
            [sessionId, itemId, itemName, itemDescription, itemImageUrl]
        );
        console.error('Item added inside addCartItem');
        res.status(201).send('Item added to cart');
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Error adding item to cart' });
    }
};

/*export const removeCartItem = async (req: Request, res: Response) => {
    const cartItemRepository = getRepository(CartItem);
    const { id } = req.params;
    const result = await cartItemRepository.delete(id);
    res.json(result);
};*/

export const removeCartItem = async (req: Request, res: Response) => {
    const itemId = req.params.id;
    const sessionId = req.cookies.sessionId;

    try {
        const connection = await connectToDatabase();
        await connection.query('DELETE FROM cart_items WHERE session_id = $1 AND item_id = $2', [sessionId, itemId]);
        //await connection.query('DELETE FROM cart_items WHERE session_id = $1 AND id = $2', [sessionId, itemId]);  //need to figure this out
        res.send('Item removed from cart');
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Error removing item from cart' });
    }
}
