import { z } from 'zod'
import { orderProductSchema } from './order-product.schema'


export const formSchema = z.object({
    customerName: z.string().min(1, "Name is required").max(255),
    country: z.string().min(1, "Country is required").max(4),
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    phone: z.string().optional(),
    email: z.email().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const orderSchema = z.object({
    status: z.enum(['pending', 'paid', 'shipped', 'cancelled']),
    total: z.number().nonnegative(),
    shippingDetails: formSchema,
    orderProducts: z.array(orderProductSchema).default([]),
});

export type Order = z.infer<typeof orderSchema>;