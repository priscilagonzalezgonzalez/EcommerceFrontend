import { boolean, int, number, z } from 'zod'

const Pagination = z.object({
    currentPage: z.int().nonnegative(),
    totalPages: z.int().nonnegative(),
    totalItems: z.int().nonnegative(),
    itemsPerPage: z.int().nonnegative()
})

export const productSchema = z.object({
    id: z.int(),
    name: z.string().max(18),
    description: z.string().max(25).optional(),
    image: z.string(),
    price: number().nonnegative(),
    active: boolean().default(true),
    stock: int().nonnegative(),
})

export const ProductsResponse = z.object({
    Products : z.array(productSchema),
    Pagination: Pagination
})

// extract the inferred type
export type Product = z.infer<typeof productSchema>
export type ProductsResponse = z.infer<typeof ProductsResponse>

