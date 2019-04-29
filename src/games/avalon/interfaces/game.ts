import { Player, PlayerId } from '../../../interfaces/player'
import { RoomId, Lobby } from '../../../interfaces/room'
import { Hash } from '../../../interfaces/hash'
import { PlayerAvalon } from './player'
import { Omit } from '@material-ui/core'

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

export interface AvalonLobby extends Omit<Lobby, 'type'> {
  type: 'avalon-lobby'
  avalonLadyOfTheLake: boolean
  avalonRoles: Role[]
}

export interface Mission {
  owner: PlayerId
  players: PlayerId[]
}

export interface MissionResult {
  card: Party
  votes: { good: number; bad: number }
  mission: Mission
}

export interface AvalonGame {
  type: 'avalon-game'
  id: RoomId

  message: null | string

  lobbyPlayers: Player[]
  players: Hash<PlayerAvalon>

  currentMission: null | Mission
  missionResults: MissionResult[]

  chaos: number

  roles: Role[]

  ladyOfTheLake: boolean
  nextLadyOfTheLake: PlayerId | null
}

export type Avalon = AvalonGame | AvalonLobby
