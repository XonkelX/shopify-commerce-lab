export function targetQuantityForSku(sku: string): number {
  const normalized = sku.trim().toUpperCase();
  if (!normalized) throw new Error("A SKU is required by the external inventory system.");
  const checksum = [...normalized].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return 12 + (checksum % 73);
}

export function asNonNegativeInteger(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.floor(parsed));
}
