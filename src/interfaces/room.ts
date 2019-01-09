import { Opaque } from './opaque'
import {
  SecretHitlerGame,
  SecretHitlerLobby,
} from '../secret-hitler/interfaces/game'
import { Player } from './player'

export type RoomId = Opaque<'Room ID', string>
export type Room = SecretHitlerGame | SecretHitlerLobby

export interface Lobby {
  id: RoomId
  lobbyPlayers: Player[]
  victoryMessage?: string | null
}
