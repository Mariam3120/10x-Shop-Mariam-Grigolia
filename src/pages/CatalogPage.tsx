import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products.api";
import type { Product } from "../types/product";

function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  //empty from beginning- when data comes we say to TS- it will be type of Product (that is imported:)
  const [loading, setLoading] = useState(true);
  //true coz when page opens its truly loading
  const [error, setError] = useState<string | null>(null);
  //at start when there's no error it is null, when error occurs it'll become a text 

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
  if (loading) return <p>Loading...</p>;
  //if it is loading write that message don't go down 
  if (error) return <p>{error}</p>;
  //if error - write that- stop
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <>
      <h1>Catalog</h1>
      {products.map((product) => (
        <p key={product.id}>{product.title}</p>
        //only when evrthg is good we map and create <p> where we take product's title 
        //product.id for react to clearly distinguish which prod.
      ))}
    </>
  );
}
export default CatalogPage;



// pages keep export default so lazy routes (FULL) work easily later