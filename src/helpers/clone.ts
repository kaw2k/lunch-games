export function clone<T>(thing: T): T {
  return JSON.parse(JSON.stringify(thing))
}
