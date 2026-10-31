import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchProductById } from "../api/products.api";
import type { Product } from "../types/product";
import NotFoundPage from "./NotFoundPage";
import { discountedPrice, formatPrice } from "../utils/format";
import { ProductGallery } from "../components/product/ProductGallery";
import { QuantityStepper } from "../components/product/QuantityStepper";

function ProductPage() {
  //useParams is a react hook that allows to read data from browser URL line (a.g/products/5) so that 5 or other text can be taken by useParams
  //id: string coz when it finds e.g id 5 - it is a text, evrthng in URL is a text
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  //when useParams gives us "5", or other text we need to send to the server as a number (if user writes stupid txt like absb -> NaN)
  const isValidId = Number.isInteger(productId) && productId > 0;
  //still check if that ID is valid number, isInteger makes it whole number, or more than 0 (number is valid when 5- true, if ashd-false 404)

  // 3 states, like catalogPage
  const [product, setProduct] = useState<Product | null>(null);
  //when server successfully returns response for a product by setProduct we will fill that box with specific product obj
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!isValidId) return;
    //if id is not valid don't bother to fetch :)
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        setQuantity(1); //moving on another prdct - quantity to put on 1(coz we don't need again 3 on other for example:D). there were 2 ways to move quantity at 1 when moved to another prdct - use key like in gallery that 
        //would force react to demolish whole component and build it again and 2nd by hand setQuantity(1) 
        // Why here: this effect re-runs whenever the id in the URL changes (see [productId, isValidId]).
        // Moving from /products/1 to /products/2 keeps the same ProductPage on screen, so React keeps its state.
        // Without these lines, loading would stay false after the first product,
        // and an old error would stay on screen and hide the new product.
        // So before each new fetch we reset both: show Loading again and clear the old error.
        //
        // Why not in CatalogPage: its effect has [], so it runs only once, when the page opens.
        // There, useState already starts with loading = true and error = null, so there's nothing to reset.

        const data = await fetchProductById(productId);
        if (!ignore) {
          setProduct(data);
        }
      } catch (err: unknown) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [productId, isValidId]);
  // Dependency array: React re-runs this effect only when one of these values changes.
  // A new id in the URL means a new fetch, so the page always shows the right product.
  // isValidId is listed because the effect uses it too, and the ESLint rule requires it.
  //it's like: watch when one of these values changes and give this code again when it changes

  if (!isValidId) return <NotFoundPage />;
  if (loading) return <p className="text-center py-12">Loading…</p>;
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>;

  //if product can;t be found we show not found page again
  if (!product) return <NotFoundPage />;

  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage >= 1;
  //Why after !product? Above that line, product might be null, so product.price would be a TypeScript error. Below it, the page has already returned NotFound for null, so TypeScript knows product is a real product.

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <ProductGallery
          key={product.id} //we need key here coz if e move from prod 1 to prod 2 it's totally new comp
          images={
            product.images.length > 0 ? product.images : [product.thumbnail]
          }
          title={product.title}
        />

        <div className="flex flex-col gap-4">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category} {product.brand && `· ${product.brand}`}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(finalPrice)}
            </span>

            {hasDiscount && (
              <span className="text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}

            {hasDiscount && (
              <span className="rounded bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-700">
                −{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>
          {product.stock > 0 ? (
            <QuantityStepper
              quantity={quantity} //current quantity
              max={product.stock} 
              onChange={setQuantity}
            />
          ) : (
            <p className="font-medium text-red-500">Out of stock</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductPage;
