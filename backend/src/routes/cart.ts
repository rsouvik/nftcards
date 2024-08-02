import { Router } from 'express';
import { getCartItems, addCartItem, removeCartItem } from '../controllers/cartController';

const router = Router();

router.get('/', getCartItems);
router.post('/', addCartItem);
router.delete('/:id', removeCartItem);

export default router;
