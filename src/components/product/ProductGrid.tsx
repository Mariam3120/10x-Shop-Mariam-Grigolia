import type { Product } from "../../types/product";
import { ProductCard } from "./ProductCard";

//we maped in catalog page as well but it's better catalog page to deal with server and loading and errors only
//so we create component to make it reusable(what if other page needs this products as well?:)

interface ProductGridProps {
  products: Product[];
}
//products coz here we need more than one product we need some array of products!!!!(first - name secon- product.ts but with[] so more than one)

//here we use destructuring, where out of props whole obj we need only products 
//we say props obj fully should follow ProductGridProps rules (interface products = func products props)
export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
