import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { cartSubtotal } from "../utils/cart";
import { formatPrice } from "../utils/format";
import type { ShippingInfo } from "../types/order";

type ShippingErrors = Partial<ShippingInfo>; // ShippingInfo is the type of the form, that needs all fields
//partial in TS means like we are writing to it ? in every field to check if it is mandatory or not
//without partial ts would require to put all 4 field is errors, but we want to check only the fields that are filled in by user, so we use partial
//by using partial we can create such empty error object where there are no errors from the beginning, and then we can add errors to it when user types in the form and we check if it is valid or not
//by that we create new type with it's rules which we use afterwards in useState<ShippingErrors>({})

function CheckoutPage() {
  const { user } = useAuth(); //to write user name in the form we need to get it from useAuth hook, so we can use it in the form
  const { items, clearCart } = useCart(); //we need to get items from the cart to calculate total and clearCart to clear the cart after order is placed

  const [form, setForm] = useState<ShippingInfo>({
    fullName: user.username, // no need of user?.username ?? "" COZ ProtectedRoute also means only logged-in users reach this page
    email: "",
    address: "",
    city: "",
  });
  //up we say state saves info that should be strictly in the form of ShippingInfo(empty in the beginning)

  const [errors, setErrors] = useState<ShippingErrors>({}); //it stores order form errors, initially empty(when it finds errors it writes errors.email, error.fullName etc
  const [orderTotal, setOrderTotal] = useState<number | null>(null); //it stores order total, initially null (when order is placed it writes total price)
  const [submitting, setSubmitting] = useState(false); // true while the order is being "placed": the button is disabled, so a double click can't order twice

  const total = cartSubtotal(items); //reduce function that calculates total price of items in the cart

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    //ts says that e is input element change event, so we can use e.target.value and e.target.name to get the value and name of the input field that is being changed
    const { name, value } = e.target; //e target is current input field that is being changed, we destructure name and value from it
    //name is name of field (fullName, email, address, city), value is what user types in the field
    setForm((prev) => ({ ...prev, [name]: value })); //we take previous form state and update the field that is being changed, [name] means that we use the value of name variable as the key, so if name is "fullName" then we update form.fullName with the new value
    //if name is email then we update form.email with the new value, etc
    setErrors((prev) => ({ ...prev, [name]: undefined })); //this line clears errors for the field that is being changed name becomes the key and we set it to undefined
  }

  function validate(): ShippingErrors {
    //this fnc will return object that suits ShippingErrors type, so we can use it to set errors state
    const newErrors: ShippingErrors = {}; //we create new object that will hold errors, initially empty

    if (form.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters"; //so newErrors is an object, fullname is its one field, and we assign error message to it, so if user types less than 3 characters in fullName field we set error message to newErrors.fullName
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (form.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }
    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    return newErrors; //lastly we return newErrors object that contains all the errors that we found in the form, if there are no errors it will be empty
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    //this happens in form so we say it to TS that it is submit event on form element
    e.preventDefault();
    const newErrors = validate(); //here we call validate function to check if there are any errors in the form, it returns object that suits ShippingErrors type
    setErrors(newErrors); //if errors are found we send it to setErrors state, so we can show error messages on the form

    if (Object.keys(newErrors).length > 0) {
      //here Object.keys(newErrors).length checks if there are any errors in the newErrors object, if there are errors we return and don't proceed with order placement
      //Objet.keys() is a built-in JavaScript method that takes an object and returns an array of its own enumerable property names (keys)
      return;
    }

    setSubmitting(true);
    // Simulate a short server request, as a real shop would have.
    // While it runs, the button stays disabled.
    setTimeout(() => {
      setOrderTotal(total); //if no errors we set orderTotal state to total price of items in the cart, so we can show it on the thank you page
      clearCart(); //we clear the cart after order is placed, so user can start a new order
    }, 1000);
  }

  if (orderTotal !== null) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Thank you! Your order has been placed.
        </h1>
        <p className="wow-phrase mb-4">Work complete!</p>
        <p className="text-muted">Total paid: {formatPrice(orderTotal)}</p>
      </div>
    );
  }

  if (items.length === 0) return <Navigate to="/cart" replace />; //if cart is empty we redirect user to cart page, so they can add items to the cart before checking out
  //coz if there are no items no need to be on checkout page

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex max-w-lg flex-col gap-4 rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="wow-phrase">Time is money, friend!</p>

      <div className="flex flex-col gap-1">
        <label htmlFor="fullName" className="font-medium text-sm">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName" //handleChangeis for all input fields, so name is important to know which field is being changed, so we can update the correct field in the form state
          type="text"
          value={form.fullName} //contolled component, so we set value to form.fullName, so it reflects the current state of the form
          onChange={handleChange} //when user click it turns on and renews setForm state, so we can see what user types in the field
          className="field"
        />
        {errors.fullName && (
          <span className="text-sm text-danger">{errors.fullName}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium text-sm">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="field"
        />
        {errors.email && (
          <span className="text-sm text-danger">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="font-medium text-sm">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={form.address}
          onChange={handleChange}
          className="field"
        />
        {errors.address && (
          <span className="text-sm text-danger">{errors.address}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="font-medium text-sm">
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={form.city}
          onChange={handleChange}
          className="field"
        />
        {errors.city && (
          <span className="text-sm text-danger">{errors.city}</span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between border-y border-line py-3 text-lg font-bold">
        <span>Total:</span>
        <span>{formatPrice(total)}</span>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full"
      >
        {submitting ? "Placing order..." : "Place order"}
      </button>
    </form>
  );
}

export default CheckoutPage;
