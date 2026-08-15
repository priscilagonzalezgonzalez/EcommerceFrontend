import type { CartData, ReserveOrderPayload } from "../types/cart.types";

export default class OrderService {
  private readonly baseUrl = `${import.meta.env.VITE_API_URL}/orders/reserve`;

  constructor() {}

  public async reserveOrder(cart: CartData) {
    try {
      const payload: ReserveOrderPayload = {
        userId: cart.userId,
        total: cart.total,
        status: cart.status,
        totalItems: cart.totalItems,
        items: Array.from(cart.items.values()),
      };

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al reservar tu orden");
      }

      const data = await response.json();
      console.log("✅ Success:", data);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  }
}
