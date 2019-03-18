import { Opaque } from './opaque'
import { Id } from '../helpers/id'

export type PlayerId = Opaque<'PlayerId', Id>

export interface Player {
  id: PlayerId
  name: string | null
  profileImg: string | null
}
