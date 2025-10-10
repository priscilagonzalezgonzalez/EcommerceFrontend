import { z } from 'zod'

export const orderSchema = z.object({
    status: z.enum(['pending', 'paid', 'shipped', 'cancelled']),
    total: z.number().nonnegative(),
    costumerName: z.string().max(255),
    country: z.string().max(4),
    street: z.string(),
    city: z.string(),
    zipCode: z.string(),
    phone: z.string().optional(),
    
})