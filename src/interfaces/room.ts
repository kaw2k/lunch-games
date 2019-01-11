import { Opaque } from './opaque'
import {
  SecretHitlerGame,
  SecretHitlerLobby,
} from '../secret-hitler/interfaces/game'
import { Player } from './player'

export type RoomId = Opaque<'Room ID', string>
export type Room = Lobby | SecretHitlerGame | SecretHitlerLobby

export interface Lobby {
  type: 'lobby'
  id: RoomId
  lobbyPlayers: Player[]
  victoryMessage?: string | null
}
