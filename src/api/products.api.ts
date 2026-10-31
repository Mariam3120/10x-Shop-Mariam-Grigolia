import type { Product, ProductsResponse } from "../types/product";
//we import productsresponse coz it is our determined structure which says to TS:
//from server we will receive this info which will have exatly that fields (total skip etc.)

const BASE_URL = "https://dummyjson.com";

//when we write code to know exactly what is coming from the server
//async always returns promise (promise that data after some time, will come :D)
//by writing export async function fetchProducts(): Promise<ProductsResponse> we say: even though function is async
//& it returns promise but know when data successfully comes from server and promise will be executed(resolved)
//its insides will be ProductsResponse type object - and when we will call this fnc in catalog it will already know what will be returned
//Promise<ProductsResponse> აკონტროლებს იმას, თუ რა გამოვა ფუნქციიდან (რა ტიპის დაპირებაა).
export async function fetchProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products?limit=12&skip=0`);

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  //response.json() by itself returns type any (js obj) so any means we don;t knwo what is inside
  //since TS doesn't like any:D it stops checking, by that writing we say: even though json() says-any, still believe me
  //coz this data has ProductsResponse type structure which we have written in advance:))))
  //so it calms TS that received data is exactly on that form as we wanted
  const data: ProductsResponse = await response.json();
  //const data: ProductsResponse შიგნით აკონტროლებს იმას, თუ როგორ აღიქვამს response.json()-ის პასუხს კოდი.

  return data;
}

/*
fetch by ID is necessary coz when we are in catalog and click to one product, we should open that one's details so we find it by its' ID
that is exactly why we need this function down, we need that one product's details when clicked to take from server 
(id: number)->id is a parameter which should be (NUMBER!)
Promise<Product | null> -> promise should return either Product or null 
*/

export async function fetchProductById(id: number): Promise<Product | null> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  //specific ID that we ask from server
  if (response.status === 404) {
    return null;
  }
  //if such Id can;t be found -> 404
  if (!response.ok) {
    throw new Error("Failed to load product");
  }
  //if some other technical error(500) then message
  const data: Product = await response.json();
  return data;
}
