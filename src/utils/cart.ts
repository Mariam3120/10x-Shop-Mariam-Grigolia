import type { CartItem } from "../types/cart";
import { discountedPrice } from "./format";

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) =>
      sum + discountedPrice(item.price, item.discountPercentage) * item.quantity,
    0,
  );
}

//this code before was used in the cart page to calculate the subtotal of the items in the cart
//sum- is what sum price we already have, item- is the current item we are iterating through, discountedPrice(item.price, item.discountPercentage) is the price of one item after discount, multiplied by item.quantity gives us the total price for that line item in the cart. We add that to sum to get the subtotal for all items in the cart.
//if price was 20 and added another 20, it will be 40 :D
//now we need it in checkout page too so we moved it here to utils/cart.ts so we can use it in both pages.