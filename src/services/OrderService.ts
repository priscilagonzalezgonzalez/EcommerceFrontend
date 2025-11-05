import {type Order} from "../schemas/order.schema";
import { z } from 'zod';

export default class OrderService {
    private readonly baseUrl = `${import.meta.env.VITE_API_URL}/orders`;

    constructor() {

    }

    public async createOrder(order: Order) {
        try {
            const response = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error("Error al enviar los datos");
            }
    
            const data = await response.json();
            console.log("✅ Success:", data);
        } catch (error) {
            console.error("❌ Error:", error);
        }
    }

}