import { Player } from '../../interfaces/player'
import { RoomId } from '../../interfaces/room'
import { Hash } from '../../interfaces/hash'
import { PlayerAvalon } from './player'

export type VoteAvalon = 'success' | 'fail'
export type PartyAvalon = 'good' | 'bad'
export type RoleAvalon =
  | 'merlin'
  | 'percivile'
  | 'morgana'
  | 'assasin'
  | 'mordrid'
  | 'good'
  | 'bad'

export interface AvalonLobby {
  type: 'avalon-lobby'
  id: RoomId
  lobbyPlayers: Player[]
  options: {
    ladyOfTheLake: boolean
    roles: RoleAvalon[]
  }
}

export interface AvalonGame {
  type: 'avalon-game'

  id: RoomId
  chaos: number

  lobbyPlayers: Player[]
  players: Hash<PlayerAvalon>

  party: null | Hash<PlayerAvalon & { vote: null | VoteAvalon }>

  options: {
    ladyOfTheLake: boolean
    roles: RoleAvalon[]
  }
}

export type Avalon = AvalonGame | AvalonLobby
