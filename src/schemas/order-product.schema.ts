import { int, z } from 'zod'

export const orderProductSchema = z.object({
    productId: z.int(),
    quantity: int().nonnegative(),
})

/* export const OrderProductApiResponse = z.object({
    pagination:
    data:z.array(orderProductSchema),
    succsess:z.string
}) */