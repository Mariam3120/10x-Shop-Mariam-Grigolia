import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products.api";
import type { Product } from "../types/product";
import { ProductGrid } from "../components/product/ProductGrid";
import { useCart } from "../hooks/useCart";

function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  //empty from beginning- when data comes we say to TS- it will be type of Product (that is imported:)
  const [loading, setLoading] = useState(true);
  //true coz when page opens its truly loading
  const [error, setError] = useState<string | null>(null);
  //at start when there's no error it is null, when error occurs it'll become a text
  const { addItem } = useCart();

  useEffect(() => {
    let ignore = false;
    //sit: if user enters this page and asks for data but till server responds user changed page, old component disappeard(unmount)
    //so when server returns respond, old component has already died but its code tries to call setProducts or setLoading
    //react doen't like that, so deal is: when components opens ingore is false, if user run out the page react
    //passes cleanup function  return () => { ignore = true; }, so when we check if(!ignore) -> if component is still alive
    //only then change the state
    //The real benefit of ignore is that an old, late response can't overwrite newer data.

    async function load() {
      //since useEffect first argument can't be async we use helper func load
      try {
        const data = await fetchProducts();
        if (!ignore) {
          setProducts(data.products);
          //if component is on place we arrange products taken from data into setProducts
          //როცა სერვერიდან მონაცემები წარმატებით წამოვა, setProducts(data.products) ფუნქციით მთელ ამ მასივს ვინახავთ ამ products ცვლადში.
        }
      } catch (err: unknown) {
        //when js throws error it doesn't know its type can be string or number so we tell TS unknown -not clear whar it is:)
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Something went wrong");
          //since err is uknown, can't be blindly used so we check if that error is standart error calss object then take
          //real error.message if not just write ..."something.."
        }
      } finally {
        if (!ignore) {
          setLoading(false);
          //finally runs always no matter what
        }
      }
    }

    load();
    //load created but if we don;t call it it will never execute -so we call - rightaway useeffect renders - call

    return () => {
      ignore = true;
    };
  }, []);
  //[]once: means: call this effect once- when this component first time appears on screen(mount)

  //Early returns: till page is loading if we don;t have these checks code will try to execute map downwards
  //so when data is loading or there are no products yet it will crash
  //BUT!!!!the early returns aren't there to prevent a crash. products starts as [], and [].map() is safe.
  // They're there to show the right screen for each state.
  if (loading)
    return <p className="py-16 text-center text-muted">Loading...</p>;
  //if it is loading write that message don't go down
  if (error) return <p className="py-16 text-center text-danger">{error}</p>;
  //if error - write that- stop
  if (products.length === 0)
    return <p className="py-16 text-center text-muted">No products found.</p>;

  return (
    <>
      <section className="mb-8 rounded-2xl border border-line bg-linear-to-r from-teal via-surface to-mauve/70 p-8 sm:p-12">
        <h1 className="text-4xl font-bold sm:text-5xl">Catalog</h1>
        <p className="mt-3 text-lg text-accent-soft sm:text-xl">
          <span className="text-2xl font-bold text-accent sm:text-3xl">
            Zug zug!
          </span>{" "}
          Choose your loot.
        </p>
      </section>
      <ProductGrid products={products} onAdd={(product) => addItem(product, 1)} />
      {/* THAT before {products.map((product) => (
        <p key={product.id}>{product.title}  was before we created beautidul productCard and created component product grid which places all products into catalog page
        map is happening there as well! here we just import:)))
        <ProductGrid products={products} /> here we give it data that we actually have (left products same as ProductGridProps-products-that is what we called)
        არჯვენა მხარე {products} (ფრჩხილებში)ეს არის ის ცვლადი, რომელიც CatalogPage-ში სერვერიდან წამოვიღე და შიგნით პროდუქტების მასივი აწყვია
        
      ))} */}
    </>
  );
}
export default CatalogPage;

// pages keep export default so lazy routes (FULL) work easily later
