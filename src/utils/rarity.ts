// WoW style loot colors, based on the product rating.
// Full class names are written out so Tailwind can find them.
export function rarityColor(rating: number): string {
  if (rating >= 4.5) return "text-legendary";
  if (rating >= 4) return "text-epic";
  if (rating >= 3) return "text-rare";
  return "text-uncommon";
}
