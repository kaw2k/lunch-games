import values from 'ramda/es/values'
import { isArray } from 'util'

type Hash<T> = { [key: string]: T }

export function count<T>(
  items: T[] | Hash<T>,
  predicate: (item: T) => boolean
): number {
  return (isArray(items) ? items : values(items)).filter(predicate).length
}
