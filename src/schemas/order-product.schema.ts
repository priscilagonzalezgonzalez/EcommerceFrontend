import { z } from 'zod'

export const orderProductSchema = z.object({
    productId: z.int(),
    quantity: z.int().nonnegative(),
})

export const CartItemSchema = z.object({
    productId: z.number(),
    image: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    subtotal: z.number(),
    stock: z.number().nonnegative()
});