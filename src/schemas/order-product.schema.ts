import { int, z } from 'zod'

export const orderProductSchema = z.object({
    orderId: z.int(),
    productId: z.int(),
    quantity: int().nonnegative(),
})

/* export const OrderProductApiResoibse = z.object({
    pagination:
    data:z.array(orderProductSchema),
    succsess:z.string
}) */