export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: string;
  images: string[];
  category: string;
  discountPercentage: number;
  rating: number;
  brand?: string;
}
//for products I wrote my product array which is written above and then I wrote the product response interface 
// which is used to get the products from the API. It contains the products array, total number of products,
//  skip and limit for pagination.
// ProductsResponse = the wrapper the API returns for a product list.
// skip/limit/total are used for pagination.
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}