import { Opaque } from '../interfaces/opaque'

export type Id = Opaque<'id', string>

export function Id() {
  return Math.random()
    .toString()
    .slice(4) as Id
}
