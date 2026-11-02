interface QuantityStepperProps {
  quantity: number; //current quantity (e.g 1,2,3)
  max: number; //max that we have in stock
  onChange: (value: number) => void; //fnc that notifies parent comp(product page) about quantity change
}
//(value: number) => void; here we say that like that props should be delivered function, which takes number
//void means that it doesn't return new value just does some action -in this case changes the state
//onChange: (value: number) => void is a function type: it takes a number and returns nothing.

export function QuantityStepper({ quantity, max, onChange,}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={() => onChange(quantity - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <span className="w-8 text-center font-medium">
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= max}
        onClick={() => onChange(quantity + 1)}
        //inside QuantityStepper onCHange - in real is setQuantity fnc, when user click - it turns onClick={() => onChange(quantity - 1)} so 
        // in real it is: setQuantity(quantity + 1)
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}

//Most interesting: controlled component example -> we don't use state here it all lives in ProductPage(quantity lives there)
//QuantityStepper is MORCHILI :D it says to parent when clicked on it -> quantity should change
//The stepper is controlled. It holds no state, only displays quantity and asks the parent to change it. quantity lives in ProductPage because the Add to cart button will need it too.