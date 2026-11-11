import { ApiError } from "./ApiError";

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`);

    if (!response.ok) {
      throw new ApiError(`Request failed: ${path}`, response.status);
    }

    const data: T = await response.json();
    //response.json() by itself returns type any (js obj) so any means we don;t knwo what is inside
    //since TS doesn't like any:D it stops checking, by that writing we say: even though json() says-any, still believe me
    //coz this data has ProductsResponse type structure which we have written in advance:))))
    //so it calms TS that received data is exactly on that form as we wanted
    return data;
  }
}

export const api = new ApiClient("https://dummyjson.com");

/*
private baseUrl: string; — ეს არის კონფიდენციალური ველი, რომელიც ინახავს საიტის მთავარ ბმულს (მაგალითად: [https://dummyjson.com](https://dummyjson.com)). სიტყვა private ნიშნავს, რომ ამ კლასის გარეთ ვერსად შეცვლიან ან წაიკითხავენ ამ მისამართს — ის მხოლოდ შიგნით გამოიყენება.
private is a TypeScript rule. TS stops api.baseUrl at compile time, but in the browser (in JS) the field still exists. For real runtime privacy, JS has #baseUrl. That's an exam-style detail, nothing to change in the code.

constructor(baseUrl: string) — როცა ამ კლასს ვქმნით (new ApiClient(...)), გადავცემთ მისამართს და ის ინახავს მას.
get<T>(path: string) — ეს არის უნივერსალური ფუნქცია, სადაც <T> არის გენერიკი (placeholder / პირობითი ტიპი).რას ნიშნავს: ერთი და იგივე ფუნქცია შეგიძლია გამოიყენო პროდუქტების, მომხმარებლების ან კატეგორიების წამოსაღებად. როცა ეძებ პროდუქტს, T-ს მაგივრად უთითებ Product-ს და TypeScript-მა ზუსტად იცის, რომ პროდუქტის ობიექტი უნდა დააბრუნოს. ზუსტად ისე მუშაობს, როგორც useState<Product>()-ში რომ უთითებდი ტიპს!fetch(${this.baseUrl}${path}) — აგზავნის მოთხოვნას სერვერზე (მაგალითად: [https://dummyjson.com/products/1](https://dummyjson.com/products/1)).if (!response.ok) — თუ სერვერმა რამე შეცდომა დააბრუნა (მაგალითად 404 ან 500), კოდი არ აგრძელებს მუშაობას, არამედ ისვრის ჩვენს მიერ შექმნილ ApiError-ს და თან აყოლებს HTTP სტატუსს (response.status).await response.json() — თუ ყველაფერი კარგადაა, აბრუნებს დასუფთავებულ ჯეისონ (JSON) მონაცემებს.
new ApiClient(...) — გახსოვს, წეღან რომ ვილაპარაკეთ new-ზე? აი აქ ვქმნით რეალურ, ერთადერთ ობიექტს ამ კლასისგან, რომელსაც ერქმევა api.

რატომ არის ეს მაგარი? მთელ აპლიკაციაში სერვერთან დასაკავშირებლად გამოიყენებ მხოლოდ ამ ერთ api ობიექტს (მაგალითად: api.get<Product>('/products/1')). არ გიწევს ყოველ ჯერზე ახალი კლასის შექმნა — ყველგან ერთიანი, გაზიარებული ხელსაწყო გაქვს!
get<T>, a generic: T is a placeholder type that the caller fills in. api.get<Product>("/products/1") returns Promise<Product>, and api.get<ProductsResponse>(...) returns Promise<ProductsResponse>. One function works for every type. It's the same idea as useState<T>.
throw new ApiError(..., response.status): the error now carries the status, so the caller can check for 404.
export const api = new ...: one shared instance (new creates an object from the class). Every file imports api, and nobody creates their own.
*/
