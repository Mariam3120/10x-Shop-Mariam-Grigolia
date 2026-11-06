import { Link, useNavigate } from "react-router";
import { useState, type SubmitEvent } from "react";
import { cartSubtotal, promoDiscount } from "../utils/cart";
import { CartLine } from "../components/cart/CartLine";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/format";

function CartPage() {
  const { items, clearCart, promoCode, applyPromo, removePromo } = useCart(); //we need all items here (which is in useState at CartProvider) to display them in cart page, and clearCart function to clear the cart when user clicks on clear cart button
  const [codeInput, setCodeInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);

  const navigate = useNavigate();
  //navigate we need to go to checkout page when user clicks on proceed to checkout button

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        <p className="text-muted">Your cart is empty.</p>
        <p className="wow-phrase mb-6">Something need doing?</p>
        <Link
          to="/" //sends back to home page where are products
          className="btn-primary"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const subtotal = cartSubtotal(items);
  //sum- is what sum price we already have, item- is the current item we are iterating through, discountedPrice(item.price, item.discountPercentage) is the price of one item after discount, multiplied by item.quantity gives us the total price for that line item in the cart. We add that to sum to get the subtotal for all items in the cart.
  //if price was 20 and added another 20, it will be 40 :D (we moved calculation to utils/cart.ts so we can use it in both pages

  const discount = promoDiscount(subtotal, promoCode);
  const total = subtotal - discount;

  function handleApply(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (applyPromo(codeInput)) {
      setCodeInput("");
      setPromoError(null);
    } else {
      setPromoError("Invalid promo code");
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="rounded-2xl border border-line bg-surface px-4">
            {items.map((item) => (
              <CartLine key={item.productId} item={item} /> //item is of type CartItem, which we defined in types/cart.ts and which is in CartLine component, we pass it as prop to CartLine component, which will display the item in the cart page.
            ))}
          </ul>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={clearCart}
              className="btn-secondary text-sm"
            >
              Clear cart
            </button>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
          <h2 className="text-xl font-bold mb-4">Summary</h2>

          <div className="space-y-3 border-b border-line pb-4">
            {promoCode ? (
              <div className="flex items-center justify-between">
                <span className="text-success">
                  Discount ({promoCode} −10%)
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-medium text-success">
                    −{formatPrice(discount)}
                  </span>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="min-h-11 px-2 text-sm text-danger hover:underline"
                  >
                    Remove
                  </button>
                </span>
              </div>
            ) : (
              <form onSubmit={handleApply} noValidate>
                <label htmlFor="promo" className="text-sm text-muted">
                  Promo code
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    id="promo"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    className="field"
                  />
                  <button type="submit" className="btn-secondary">
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="mt-1 text-sm text-danger">{promoError}</p>
                )}
              </form>
            )}

            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
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
            className="btn-primary mt-4 w-full"
          >
            Proceed to checkout
          </button>
        </aside>
      </div>
    </div>
  );
}

export default CartPage;
