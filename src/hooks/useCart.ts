import { useContext } from "react";
import { CartContext } from "../context/CartContext";

//like as useAuth, we create useCart hook to use the cart context in any component, so we don't have to import useContext and CartContext every time we want to use the cart context.
//not to write in header or any other place imports and if !context by this hook we will just need:
// const { items, addItem } = useCart(); 

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}