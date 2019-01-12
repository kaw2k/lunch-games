import { Player, PlayerId } from '../../interfaces/player'
import { RoomId } from '../../interfaces/room'
import { Hash } from '../../interfaces/hash'
import { PlayerAvalon } from './player'

export type VotesNeededToFail = 1 | 2
export type PeopleOnMission = 2 | 3 | 4 | 5
export type Vote = 'success' | 'fail'
export type Party = 'good' | 'bad'
export type Role =
  | 'merlin'
  | 'percival'
  | 'morgana'
  | 'assassin'
  | 'mordred'
  | 'good'
  | 'bad'

export interface AvalonLobby {
  type: 'avalon-lobby'
  id: RoomId
  lobbyPlayers: Player[]

  victoryMessage?: string | null

  ladyOfTheLake: boolean
  roles: Role[]
}

export interface Mission {
  owner: PlayerId
  players: PlayerId[]
}

export interface AvalonGame {
  type: 'avalon-game'
  id: RoomId

  message: null | string

  lobbyPlayers: Player[]
  players: Hash<PlayerAvalon>

  currentMission: null | Mission
  missionResults: Party[]

  chaos: number

  roles: Role[]

  ladyOfTheLake: boolean
  nextLadyOfTheLake: PlayerId | null
}

export type Avalon = AvalonGame | AvalonLobby
