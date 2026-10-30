export function discountedPrice(price: number, pct: number): number {
  return Math.round(price * (1 - pct / 100) * 100) / 100;
}
//price:number -is product's old price which must be NUMBER
//pct-percentage and it's also number type
//the last :number means- return this type(return type)

export function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount,
  );
}
//this function return string even working with numbers, coz Intl.NumberFormat changes number to text
//curreny is set default USD
