import { Player, PlayerId } from '../../interfaces/player'
import { RoomId } from '../../interfaces/room'

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

export interface PlayerAvalon extends Player {
  ready: boolean
  role: RoleAvalon
  ladyOfTheLake: boolean
}

export interface AvalonLobby {
  type: 'avalon-lobby'
  id: RoomId
  lobbyPlayers: Player[]
  roles: RoleAvalon[]
  options: {
    ladyOfTheLake: boolean
  }
}

export interface AvalonGame {
  type: 'avalon-game'

  id: RoomId
  chaos: number

  lobbyPlayers: Player[]
  players: PlayerAvalon[]

  party: null | {
    leader: PlayerId
    players: PlayerAvalon[]
  }

  options: {
    ladyOfTheLake: boolean
  }
}

export type Avalon = AvalonGame | AvalonLobby
