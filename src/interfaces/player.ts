import { Opaque } from './opaque'

export type PlayerId = Opaque<'PlayerId', string>

export interface Player {
  id: PlayerId
  name: string | null
  profileImg: string | null
}
