import type { Product, ProductsResponse } from "../schemas/product.schema";

export default class ProductService {

    private static readonly baseUrl = `${import.meta.env.VITE_API_URL}/products`;

    // Get all products
    public static async getAll(page: number, limit:number) : Promise<ProductsResponse> {
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

    public static async getById(id: string) : Promise<Product> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`)
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public static async modifyStock(id:string, quantity: number) : Promise<Product> {
        try {

            const requestBody = {
                stock: quantity
            }
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            return data.data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}