import { LOW_STOCK_THRESHOLD } from "../../constants/products/stock.constants";

export function resolveStockMessage(stock: number): string | null {
  if (stock <= 0) return "Out of stock";
  if (stock <= LOW_STOCK_THRESHOLD) {
    return `Only ${stock} left in stock - order soon.`;
  }
  return `In stock`;
}