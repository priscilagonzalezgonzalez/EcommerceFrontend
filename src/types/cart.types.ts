import type z from 'zod';
import { CartItemSchema } from '../schemas/order-product.schema';

export type CartItem = z.infer<typeof CartItemSchema>

export type CartData = {
  userId?: number;
  total: number;
  items: Map<number, CartItem>;
  status: string;
  totalItems: number;
};

export type ReserveOrderPayload = Omit<CartData, "items"> & {
  items: CartItem[];
};

export type CartActions = {
  addItemToCart: (product: CartItem) => void;
  removeItem: (product: CartItem) => void;
  clearCart: () => void;
  updateItemQuantity: (product: CartItem) => void;
  getItemById: (productId: number) => CartItem | undefined;
};

export type CartState = CartData & CartActions;