import { Opaque } from './opaque'
import { Role } from './game'

export type PlayerId = Opaque<'PlayerId', string>

export interface Player {
  id: PlayerId
  name: string | null
  profileImg: string | null
}

export interface PlayerGame extends Player {
  living: boolean
  role: Role
  ready: boolean
}
