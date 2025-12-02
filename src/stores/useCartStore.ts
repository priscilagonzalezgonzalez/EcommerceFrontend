import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { type CartItem } from '../schemas/order-product.schema';

type CartState = {
    userId?: number
    total: number;
    items: Map<number, CartItem>;
    status: string;
    totalItems: number;

    addItemToCart: (product: CartItem) => void;
    removeItem: (product: CartItem) => void;
    clearCart: () => void;
    updateItemQuantity: (product: CartItem) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            userId: undefined,
            total: 0,
            items: new Map(),
            status: "pending",
            totalItems: 0,

            addItemToCart: (product) => 
                set((state) => { 
                    let currentSubtotal;
                    let newTotal;
                    let newQuantity = product.quantity;
                    let newSubtotal = product.price * newQuantity;
                    const newTotalItems = product.quantity + state.totalItems;
        
                    //const currentItem = state.items.get(product.productId);
                    const currentItem = get().items.get(product.productId);
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
        
                    return { ...state, items: newItems, total: newTotal, totalItems: newTotalItems };
                }),
        
            removeItem: (product) =>
                set((state) => {
                    state.items.delete(product.productId);
                    const newItems = new Map(state.items); 
                    const newTotal = state.total - product.subtotal;
                    const newTotalItems = state.totalItems - product.quantity;
        
                    return { ...state, items: newItems, total: newTotal, totalItems: newTotalItems}
                }),
        
            clearCart: () => 
                set((state) => {
                    return { ...state, items: new Map(), total: 0, totalItems: 0}
                }),
        
            updateItemQuantity: (product) =>
                set((state) => {
                    const newItems = new Map(state.items);
                    const currentItem = state.items.get(product.productId);
        
                    const currentSubtotal = currentItem?.subtotal ?? 0;
                    const currentTotalItems = currentItem?.quantity ?? 0;
                    const newSubtotal = product.price * product.quantity;
                    const newCartItem = {...product, subtotal: newSubtotal};
                    newItems.set(product.productId, newCartItem);
        
                    const newTotal = state.total - currentSubtotal + newCartItem.subtotal;
                    const newTotalItems = state.totalItems - currentTotalItems + newCartItem.quantity;
        
                    return { ...state, items: newItems, total: newTotal, totalItems: newTotalItems}
                }),
        }),

        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage, {
                replacer: (key, value) => {
                    if (value instanceof Map) {
                        return {
                          __type: "Map",
                          value: Array.from(value.entries()),
                        };
                    }
                    return value;
                },
                reviver: (key, value: any) => {
                    if (key === 'items') {
                        if (Array.isArray(value.value)) {
                            return new Map(value.value);
                        } else {
                            console.error("Expected 'items' value to be an array during revival, but got:", value);
                            return new Map(); 
                        }
                    }

                    return value;
                },
            })

            
        },
    )
);