import { Cart } from 'src/app/types';

export const EMPTY_CART: Partial<Cart> = {
  products: [],
  total: 0,
  discountedTotal: 0,
  userId: 0,
  totalProducts: 0,
  totalQuantity: 0,
};
