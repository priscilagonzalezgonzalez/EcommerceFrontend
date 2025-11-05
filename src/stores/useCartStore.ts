import { create } from 'zustand'
import { type CartItem } from '../schemas/order-product.schema';

type CartState = {
    userId?: number
    total: number;
    items: Map<number, CartItem>;
    status: string;

    addItemToCart: (product: CartItem) => void;
    removeItem: (product: CartItem) => void;
    clearCart: () => void;
    updateItemQuantity: (product: CartItem) => void;
}

export const useCartStore = create<CartState>((set) => ({
    userId: undefined,
    total: 0,
    items: new Map(),
    status: "pending",

    addItemToCart: (product) => 
        set((state) => { 
            // TODO: Update the product stock
            let currentSubtotal;
            let newTotal;
            let newQuantity = product.quantity;
            let newSubtotal = product.price * newQuantity;

            const currentItem = state.items.get(product.productId);
            if(currentItem){
                // If the product exists, obtain current subtotal to recalculate it
                currentSubtotal = currentItem.subtotal;

                // Add new item to the count
                newQuantity = product.quantity + currentItem.quantity;
                newSubtotal = product.price * newQuantity;
            }
            
            // Update the cartItem
            const newCartItem = {...product, quantity: newQuantity, subtotal: newSubtotal}
            const newItems = new Map(state.items);
            newItems.set(product.productId, newCartItem);

            // Recalculate Cart Total
            if(currentSubtotal) {
                newTotal = state.total - currentSubtotal + newCartItem.subtotal;
            }
            else {
                newTotal = state.total + newCartItem.subtotal;
            }

            return { ...state, items: newItems, total: newTotal };
        }),

    removeItem: (product) =>
        set((state) => {
            state.items.delete(product.productId);
            const newItems = new Map(state.items); 
            const newTotal = state.total - product.subtotal;

            return { ...state, items: newItems, total: newTotal}
        }),

    clearCart: () => 
        set((state) => {
            const newItems = new Map();
            const newTotal = 0;

            return { ...state, items: newItems, total: newTotal}
        }),

    updateItemQuantity: (product) =>
        set((state) => {
            const newItems = new Map(state.items);
            const currentItem = state.items.get(product.productId);

            const currentSubtotal = currentItem?.subtotal ?? 0;
            const newSubtotal = product.price * product.quantity;
            const newCartItem = {...product, subtotal: newSubtotal}
            newItems.set(product.productId, newCartItem);

            const newTotal = state.total - currentSubtotal + newCartItem.subtotal;

            return { ...state, items: newItems, total: newTotal}
        }),
}));