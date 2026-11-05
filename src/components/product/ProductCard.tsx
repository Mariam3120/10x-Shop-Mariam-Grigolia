import { Link } from "react-router";
import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { discountedPrice, formatPrice } from "../../utils/format";
import { rarityColor } from "../../utils/rarity";
import { stockStatus } from "../../utils/stock";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => boolean;
}
//here we determined props interface [JUST ONE PRODUCT as it is just one!!!!] key-value (first is my chosen name, second is Product the type which comes from types.ts)

//when we create comp ProductCard it receives from parent(Catalog) some data, in this case specific product
//TS to know exactly what ProductCard received we wrote interface which means:
//when data(props) will be given to PRoductCard in this object must be product key, and the type should be what we have determined in product
//function ProductCard({ product }: ProductCardProps-> here we say use this ProductCardProps rule as this component's props type
//ეს არის კოდის უსაფრთხოების დაცვა, რომ კომპონენტმა ზუსტად იცოდეს, რა სახის მონაცემი უნდა მიიღოს გარედან
export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [message, setMessage] = useState<string | null>(null);
  function handleAdd() {
    const added = onAdd(product);
    setMessage(added ? "Added ✓" : "No more in stock");
  }

  // The message replaces the button text for 1.5s, then "Add to cart" comes back.
  // Cleanup stops the timer if the card disappears before it ends.
  useEffect(() => {
    if (message === null) return;
    const timer = setTimeout(() => setMessage(null), 1500);
    return () => clearTimeout(timer);
  }, [message]);

  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  //discountedPrice receives 2 arguments, the price and percentage, uses math formula to calculate
  //and that number we give to formatter
  const hasDiscount = product.discountPercentage >= 1;

  const stock = stockStatus(product.stock);


  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-linear-to-br from-surface to-teal/40 p-4 transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/10">
      {
        //link is analogy of <a> img or title must be clickable
      }
      <Link to={`/products/${product.id}`} className="relative block">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          width={300}
          height={300}
          className="h-48 w-full rounded-xl bg-linear-to-br from-panel to-panel-deep object-contain p-3"
        />
        <span
          aria-hidden="true"
          className="wow-phrase absolute inset-x-2 text-sm! top-2 rounded-full bg-footer/90 px-2 py-1 text-center opacity-0 transition group-hover:opacity-100"
        >
          What business have you?
        </span>

        <h2 className={`mt-3 font-semibold ${rarityColor(product.rating)}`}>
          {product.title}
        </h2>
      </Link>
      {
        //Category and ?brand
        //&&-means if the left side exists, is true then show the right :) so if product will have brand it will show, if not it won;t crush
        //here if brand is : we take stop . and connect it to brand name (if it'n not there then nothing will be painted)
      }
      <div className="mt-1 font-sans text-xs text-muted capitalize">
        {product.category} {product.brand && `· ${product.brand}`}
      </div>
      {
        //old price / crossed out / discount percentage
        /* 
        1-first span shows final price which is formatted in formatPrice func
        */
      }
      <div className="mt-3 mb-3 flex items-center gap-2">
        <span className="text-lg font-bold text-accent">
          {formatPrice(finalPrice)}
        </span>
        {/* 
        2-if discPercent exists we will show old price line through 
        */}
        {hasDiscount && (
          <span className="text-sm text-muted line-through">
            {formatPrice(product.price)}
          </span>
        )}
        {/* 
        3-if sale exists we will show green colored sale percentage (show badge if sale percentage is 1 or more:)
        */}
        {hasDiscount && (
          <span className="ml-auto rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
            −{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-line pt-3 font-sans text-sm">
        <span className="font-medium text-accent-soft">
          ★ {product.rating.toFixed(1)}
        </span>
        <span className={`font-medium ${stock.color}`}>{stock.text}</span>
      </div>
      <button
        type="button"
        disabled={product.stock === 0}
        onClick={handleAdd}
        aria-live="polite"
        className="mt-3 inline-flex min-h-11 items-center self-end rounded-full border border-accent px-4 text-sm font-semibold text-accent transition enabled:hover:bg-accent enabled:hover:text-on-accent disabled:cursor-not-allowed disabled:border-line disabled:text-muted"
      >
        {product.stock === 0 ? "Out of stock" : (message ?? "Add to cart")}
      </button>
    </article>
  );
}
