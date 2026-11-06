import { useEffect, useState, type ReactNode } from "react";
import { CartContext } from "./CartContext";
import type { CartItem, CartState } from "../types/cart";
import { PROMO_CODE } from "../utils/cart";
import type { Product } from "../types/product";

// The CartProvider component is responsible for managing the state of the shopping cart and providing it to the rest of the application through the CartContext.

const STORAGE_KEY = "shop_cart";
//this variable is used to store the cart data in the browser's localStorage, allowing the cart to persist across page reloads and sessions.

const EMPTY_CART: CartState = { items: [], promoCode: null };

//this fnc down loadCart(): CartItem[] is only allowed to return cartItem type array, and it is used to load the cart data from localStorage
// when the CartProvider component is first rendered. It tries to retrieve the saved cart data from localStorage using the STORAGE_KEY.
// If there is no saved data or if an error occurs during parsing, it returns an empty array, indicating that the cart is initially empty
//CREATED before provider, because we need to load cart data before provider is created, so that provider can use it as initial state.
function loadCart(): CartState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    //go to browser localStorage and get the value by key STORAGE_KEY, which is "shop_cart" and assign it to saved variable.
    if (saved === null) return EMPTY_CART;
    //if it is empty or user first time entered and there is no value in localStorage, return empty array.
    const parsed: unknown = JSON.parse(saved);
    //unknown type is used when we don't know the type of a value, and we want to perform some checks or assertions before using it.
    //in localStorage everythin is saved as string, so we need to parse it to get the original data structure back.(when we read back)
    // JSON.parse converts the JSON string back into a JavaScript object or array
    if (Array.isArray(parsed)) return { items: parsed, promoCode: null };   // Old format: just an array of items (before the promo code existed)

    // New format: { items, promoCode }
    if (typeof parsed === "object" && parsed !== null && "items" in parsed && Array.isArray(parsed.items)) {
      const promoCode =
        "promoCode" in parsed && typeof parsed.promoCode === "string" ? parsed.promoCode : null;
      return { items: parsed.items, promoCode };
    }
     return EMPTY_CART;

  } catch {
     return EMPTY_CART;
    //sometimes text can be damaged or not in correct format, so we need to catch the error and return empty array.
  }
}

//children is a special prop in React that allows components to pass elements or components as children to other components.
//a.g <CartProvider><Header /><Main /></CartProvider> (reactNode means any valid react element, like component, html tag, text, etc)
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart().items);
  const [promoCode, setPromoCode] = useState<string | null>(() => loadCart().promoCode);

  //items-current state of the cart, setItems-function to update the state
  //this state will be <CartItem[]> type, which is an array of CartItem objects, (loadCart) is state's staerter value
  //  which is loaded from localStorage by loadCart() function.
  //so it will be the type CartItem but take value from what loadCart() returns!!!

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, promoCode }));
    //it's like autosave, every time items state changes, we save the new state to localStorage by converting it to a JSON string using JSON.stringify.
  }, [items, promoCode]);
  //[items] means change when items state changes, run the effect function, which saves the new state to localStorage.

  function addItem(product: Product, quantity: number) {
    const existing = items.find((item) => item.productId === product.id);
    //existing variable checks if the product is already in the cart
    //left side is the item in the cart, right side is the product we want to add, if they match, it means the product is already in the cart.
    //product.id is in Product type, and item.productId is in CartItem type!so we can compare them.(when we create new CarItem we use productId = product.id)
    const inCart = existing ? existing.quantity : 0; // inCart = how many of this product are already in the cart (0 if it's new)

    if (inCart + quantity > product.stock) {
      return false; // more than stock: add nothing
    }
    // Stock check BEFORE changing anything: if cart amount + new amount is more than stock,
    // we add nothing and return false, so the button can show "No more in stock".
    // Before, Math.min silently cut the amount, and the user never knew why.

    if (existing) {
      setItems(
        items.map(
          (item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          // Just add the new amount to the old one. We no longer need Math.min here,
          // because the check above already guarantees the total fits in stock.
          // ...item copies the old object, so the update stays immutable.

          //if exists we spread item with it's old properties and update the quantity, item.quantity + quantity takes what's in cart and adds new quantitu
          //Math.min(item.quantity + quantity, item.stock)ensures that the quantity does not exceed the available stock of product.(math min takes the smaller value of two numbers)
          //like if user added3 shirts and in stock are 5, and added another 4 shirts, it will only add 2 more shirts to reach the stock limit of 5.
        ),
      );
    } else {
      //if new item we add at the end of the array, we create a new CartItem object with the product's details
      const newItem: CartItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail,
        stock: product.stock,
        quantity,
      };
      setItems([...items, newItem]);
    }

    return true; // Reaching this line means the item was added, so we report success.
  }

  function removeItem(productId: number) {
    setItems(items.filter((item) => item.productId !== productId));
  }
  //filter coz it returns new array with all items that do not match the productId, effectively removing the item from cart
  //it meand take all items which id is not equal to deleting productId and return new array with them, and set it as new state.
  // here we don;t need product.id -thw shole product object, we just need cartItems's productId to identify which item to remove from the cart.
  //function gets productId as argument, which is the id of the product we want to remove from the cart.
  //that specific item.productId means item in card which is compared to productId we want to remove, if they are not equal, it will be kept in the new array, if they are equal, it will be removed from the new array.

  function updateQuantity(productId: number, quantity: number) {
    // ვუცვლით რაოდენობას და ვიცავთ საზღვრებს (1-დან stock-მდე)
    setItems(
      items.map((item) =>
        item.productId === productId
          ? //item.productId is the id of the item in the cart, productId is the id of the product we want to update, if they match, it means we found the item we want to update.
            { ...item, quantity: Math.min(Math.max(quantity, 1), item.stock) }
          : //Math.max(quantity, 1) ensures that the quantity is at least 1, so user can't set it to 0 or negative number.
            //Math.min(Math.max(...), item.stock) ensures that the quantity does not exceed the available stock of product.
            item,
      ),
    );
  }


  function applyPromo(code: string): boolean {
  if (code.trim().toUpperCase() !== PROMO_CODE) return false;
  setPromoCode(PROMO_CODE);
  return true;
}

function removePromo() {
  setPromoCode(null);
}

  function clearCart() {
    setItems([]); //clears the cart by setting the items state to an empty array, effectively removing all items from the cart.
    setPromoCode(null);
  }


  // itemCount is a variable that calculates the total number of items in the cart by summing up the quantity of each item in the items array.
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  //reduce walks through the items and adds each quantity to sum, starting from 0.

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        promoCode,
        applyPromo, 
        removePromo
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
