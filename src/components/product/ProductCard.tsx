import { Link } from "react-router";
import type { Product } from "../../types/product";
import { discountedPrice, formatPrice } from "../../utils/format";

interface ProductCardProps {
  product: Product;
}
//here we determined props interface [JUST ONE PRODUCT as it is just one!!!!] key-value (first is my chosen name, second is Product the type which comes from types.ts)

//when we create comp ProductCard it receives from parent(Catalog) some data, in this case specific product
//TS to know exactly what ProductCard received we wrote interface which means:
//when data(props) will be given to PRoductCard in this object must be product key, and the type should be what we have determined in product
//function ProductCard({ product }: ProductCardProps-> here we say use this ProductCardProps rule as this component's props type
//ეს არის კოდის უსაფრთხოების დაცვა, რომ კომპონენტმა ზუსტად იცოდეს, რა სახის მონაცემი უნდა მიიღოს გარედან
export function ProductCard({ product }: ProductCardProps) {
  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  //discountedPrice receives 2 arguments, the price and percentage, uses math formula to calculate
  //and that number we give to formatter
  const hasDiscount = product.discountPercentage >= 1;

  let stockText = "In stock";
  let stockColor = "text-gray-600";
  //if products are out of stock user must see red text
  //if stock is few, 5 or less we must warn the user
  //when it is enough we just write normal txt
  if (product.stock === 0) {
    stockText = "Out of stock";
    stockColor = "text-red-500";
  } else if (product.stock <= 5) {
    stockText = `Only ${product.stock} left!`;
    stockColor = "text-orange-500";
  }

  return (
    <article className="rounded-lg border p-4">
      {
        //link is analogy of <a> img or title must be clickable
      }
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          width={300}
          height={300}
          className="h-48 w-full object-contain"
        />

        <h2>{product.title}</h2>
      </Link>
      {
        //Category and ?brand
        //&&-means if the left side exists, is true then show the right :) so if product will have brand it will show, if not it won;t crush
        //here if brand is : we take stop . and connect it to brand name (if it'n not there then nothing will be painted)
      }
      <div className="text-xs text-gray-500 capitalize">
        {product.category} {product.brand && `· ${product.brand}`}
      </div>
      {
        //old price / crossed out / discount percentage
        /* 
        1-first span shows final price which is formatted in formatPrice func
        */
      }
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-gray-900">
          {formatPrice(finalPrice)}
        </span>
        {/* 
        2-if discPercent exists we will show old price line through 
        */}
        {hasDiscount && (
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(product.price)}
          </span>
        )}
          {/* 
        3-if sale exists we will show green colored sale percentage (show badge if sale percentage is 1 or more:)
        */}
        {hasDiscount && (
          <span className="ml-auto rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
            −{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
        <span className="text-amber-500 font-medium">★ {product.rating.toFixed(1)}</span>
        <span className={`font-medium ${stockColor}`}>{stockText}</span>
      </div>
    </article>
  );
}
