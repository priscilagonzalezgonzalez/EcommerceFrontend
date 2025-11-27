import type { Product, ProductsResponse } from "../schemas/product.schema";

export default class ProductService {

    private readonly baseUrl = `${import.meta.env.VITE_API_URL}/products`;

    // Get all products
    public async getAll(page: number, limit:number) : Promise<ProductsResponse> {
        try {
            const response = await fetch(`${this.baseUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();
            return {
                Products: data.data,
                Pagination: data.pagination
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getById(id: string) : Promise<Product> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`)
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}