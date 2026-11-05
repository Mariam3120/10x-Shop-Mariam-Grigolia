export interface StockStatus {
  text: string;
  color: string;
}

// One place for the PRD stock rules, used by the card and the Product page
export function stockStatus(stock: number): StockStatus {
  if (stock === 0) return { text: "Out of stock", color: "text-danger" };
  if (stock <= 5) return { text: `Only ${stock} left!`, color: "text-warn" };
  return { text: "In stock", color: "text-muted" };
}
 //if products are out of stock user must see red text
  //if stock is few, 5 or less we must warn the user
  //when it is enough we just write normal txt