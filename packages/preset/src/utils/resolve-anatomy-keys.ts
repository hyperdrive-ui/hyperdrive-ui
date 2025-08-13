
export function resolveAnatomyKeys(anatomy: any): string[] {
  const k = anatomy?.keys
  // zag/ark older: keys() → string[]
  if (typeof k === 'function') return k()
  // newer: keys: readonly string[]
  if (Array.isArray(k)) return [...k]
  // (very old) some builds expose parts()
  if (typeof anatomy?.parts === 'function') return anatomy.parts()
  return []
}
