import { Opaque } from './opaque'
import { Player, PlayerId } from './player'
import { SecretHitler } from '../games/secret-hitler/interfaces/game'
import { Avalon } from '../games/avalon/interfaces/game'
import { Werewolf } from '../games/werewolf/interfaces/game'
import { Murder } from '../games/murder/interfaces/game'

export type RoomId = Opaque<'Room ID', string>
export type Room = Lobby | SecretHitler | Avalon | Werewolf | Murder

export interface Lobby {
  type: 'lobby'
  id: RoomId
  lobbyPlayers: Player[]
  spectators: PlayerId[]
  victoryMessage?: string | null
}
