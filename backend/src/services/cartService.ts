import { getRepository } from 'typeorm';
import { CartItem } from '../models/cartItem';

export class CartService {
    private cartItemRepository = getRepository(CartItem);

    /**
     * Fetch all items in the cart.
     */
    async getAllItems() {
        try {
            return await this.cartItemRepository.find();
        } catch (error) {
            console.error('Error fetching cart items:', error);
            throw new Error('Unable to fetch cart items');
        }
    }

    /**
     * Add a new item to the cart.
     * @param item - The item to be added to the cart
     */
    async addItem(item: Partial<CartItem>) {
        try {
            const newItem = this.cartItemRepository.create(item);
            return await this.cartItemRepository.save(newItem);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw new Error('Unable to add item to cart');
        }
    }

    /**
     * Remove an item from the cart by its ID.
     * @param id - The ID of the item to remove
     */
    async removeItem(id: number) {
        try {
            const result = await this.cartItemRepository.delete(id);
            if (result.affected === 0) {
                throw new Error('Item not found');
            }
            return result;
        } catch (error) {
            console.error('Error removing item from cart:', error);
            throw new Error('Unable to remove item from cart');
        }
    }
}
