import { createContext } from "react";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

//So here we again create a cotext for any components to use the cart state and functions(e.g header, cart page, product page..)

export interface CartContextValue {
  items: CartItem[];
  itemCount: number; // total units, for the Header badge
  addItem: (product: Product, quantity: number) => boolean; //so it returns true if added and false if stock is exceeded
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  promoCode: string | null;
  applyPromo: (code: string) => boolean; // true if the code is valid
  removePromo: () => void;
}
//we created an interface which determines the shape of the context value, which will be provided to the components that consume this context.
//addItem: (product: Product, quantity: number) => void; this is a function that takes a product(Product component) and quantity(number) as arguments and adds the item to the cart.
//void doesn't return anything, it just performs the action of adding the item to the cart.
export const CartContext = createContext<CartContextValue | null>(null);
//by that line we create context box which either will be CartContextValue or null, and we set the default value to null.
// This means that if a component tries to consume the context without being wrapped in a provider, it will receive null as the context value.
