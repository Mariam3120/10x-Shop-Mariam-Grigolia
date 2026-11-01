import { Link, useNavigate } from "react-router";
import { CartLine } from "../components/cart/CartLine";
import { useCart } from "../hooks/useCart";
import { discountedPrice, formatPrice } from "../utils/format";

function CartPage() {
  const { items, clearCart } = useCart();
  //we need all items here (which is in useState at CartProvider) to display them in cart page, and clearCart function to clear the cart when user clicks on clear cart button
  const navigate = useNavigate();
  //navigate we need to go to checkout page when user clicks on proceed to checkout button

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty.</p>
        <Link
          to="/" //sends back to home page where are products
          className="inline-block rounded bg-gray-900 px-6 py-2.5 font-medium text-white hover:bg-gray-700"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const subtotal = items.reduce(
    (sum, item) =>
      sum + discountedPrice(item.price, item.discountPercentage) * item.quantity,
    0,
  );
  //sum- is what sum price we already have, item- is the current item we are iterating through, discountedPrice(item.price, item.discountPercentage) is the price of one item after discount, multiplied by item.quantity gives us the total price for that line item in the cart. We add that to sum to get the subtotal for all items in the cart.
  //if price was 20 and added another 20, it will be 40 :D


  const total = subtotal; // For now, Total equals subtotal until promo code, taxes, and shipping are implemented. 

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="divide-y border-t">
            {items.map((item) => (
              <CartLine key={item.productId} item={item} /> //item is of type CartItem, which we defined in types/cart.ts and which is in CartLine component, we pass it as prop to CartLine component, which will display the item in the cart page.
            ))}
          </ul>
          
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={clearCart}
              className="rounded border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Clear cart
            </button>
          </div>
        </div>

        <aside className="rounded-lg border p-6 h-fit bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          
          <div className="space-y-3 pb-4 border-b">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
          </div>

          <div className="flex justify-between py-4 text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="w-full mt-4 rounded bg-gray-900 px-4 py-3 font-medium text-white hover:bg-gray-700 text-center"
          >
            Proceed to checkout
          </button>
        </aside>
      </div>
    </div>
  );
}

export default CartPage;