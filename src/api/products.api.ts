import type { Product, ProductsResponse } from "../types/product";
//we import productsresponse coz it is our determined structure which says to TS:
//from server we will receive this info which will have exatly that fields (total skip etc.)
import { api } from "./ApiClient";
import { ApiError } from "./ApiError";

//when we write code to know exactly what is coming from the server
//async always returns promise (promise that data after some time, will come :D)
//by writing export async function fetchProducts(): Promise<ProductsResponse> we say: even though function is async
//& it returns promise but know when data successfully comes from server and promise will be executed(resolved)
//its insides will be ProductsResponse type object - and when we will call this fnc in catalog it will already know what will be returned
//Promise<ProductsResponse> აკონტროლებს იმას, თუ რა გამოვა ფუნქციიდან (რა ტიპის დაპირებაა).

export function fetchProducts(): Promise<ProductsResponse> {
  return api.get<ProductsResponse>("/products?limit=12&skip=0");
}
//we no longer write here if !response.ok and const data coz it is in acpiClient

/*
fetch by ID is necessary coz when we are in catalog and click to one product, we should open that one's details so we find it by its' ID
that is exactly why we need this function down, we need that one product's details when clicked to take from server 
(id: number)->id is a parameter which should be (NUMBER!)
Promise<Product | null> -> promise should return either Product or null 
*/

export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    return await api.get<Product>(`/products/${id}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}
//class gave us possibility to write this functions above like that
//and URL lives in clientApi