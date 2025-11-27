import { int, z } from 'zod'

export const orderProductSchema = z.object({
    productId: z.int(),
    quantity: int().nonnegative(),
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

// extract the inferred type
export type CartItem = z.infer<typeof CartItemSchema>

/* export const OrderProductApiResponse = z.object({
    pagination:
    data:z.array(orderProductSchema),
    succsess:z.string
}) */