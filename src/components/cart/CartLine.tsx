import { Link } from "react-router";
import { QuantityStepper } from "../product/QuantityStepper";
import { useCart } from "../../hooks/useCart";
import { discountedPrice, formatPrice } from "../../utils/format";
import type { CartItem } from "../../types/cart";

interface CartLineProps {
  item: CartItem;
}

export function CartLine({ item }: CartLineProps) {
  //this function takes props from CartLine component and destructures it to get item, which is of type CartItem
  const { removeItem, updateQuantity } = useCart(); //this hook returns the cart context, which contains the items in the cart and functions to manipulate them. We destructure it to get removeItem and updateQuantity functions.
  //here we only take remove and + - because we don't need to add item in cart, we are already in cart page, so we only need to remove or update quantity of existing items in cart.

  const unitPrice = discountedPrice(item.price, item.discountPercentage); //this function takes the price and discount percentage of the item and returns the discounted price.(one item price)
  const lineTotal = unitPrice * item.quantity;//this is the total price for this line item in the cart, which is the unit price multiplied by the quantity of the item in the cart.

  return (
    //coz cart page has UL we return li for each item in cart, so we can map through items and return CartLine for each item
    <li className="flex flex-wrap items-center gap-4 border-b border-line py-4 last:border-b-0">
      <div className="flex items-center gap-4">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-20 w-20 rounded-lg bg-linear-to-br from-panel to-panel-deep object-contain p-1"
        />
        <div>
          <Link
            to={`/products/${item.productId}`}
            //this link takes us to the product page of individual product, where we can see more details
            className="font-medium transition hover:text-accent"
          >
            {item.title}
          </Link>
          <p className="text-sm text-muted">{formatPrice(unitPrice)}</p> 
        </div>
      </div>

      <QuantityStepper
        quantity={item.quantity}
        max={item.stock}
        onChange={(value) => updateQuantity(item.productId, value)}
      />
      {
        /*
        quantity stepper with all its 3 props: quantity, max and onChange. 
        onchange - value is the new quantity, => this means give it to updateQuantity function
        updateQuantity(item.productId, value) this global fnc needs productId and new quantity to update the cart state, so we pass item.productId and value to it.
        updateQuantitiy we took from useCart hook above:)
        */
      }

      <div className="font-semibold text-accent sm:ml-auto">{formatPrice(lineTotal)}</div>

      <button
        type="button"
        onClick={() => removeItem(item.productId)}
        //this fnc just needs productId to remove the item from cart
        className="text-sm font-medium text-danger hover:underline"
      >
        Remove
      </button>
    </li>
  );
}
