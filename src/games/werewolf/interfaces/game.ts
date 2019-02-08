import { Roles } from './role'
import { PlayerWerewolf } from './player'
import { Lobby, RoomId } from '../../../interfaces/room'
import { Hash } from '../../../interfaces/hash'
import { Player } from '../../../interfaces/player'
import { Omit } from '@material-ui/core'
import { Artifact } from './artifact'

interface Options {
  timeLimit: number
  boogymanOP: boolean
  noFlip: boolean
  ghost: boolean
  killCult: boolean
}

export interface WerewolfGame {
  type: 'werewolf-game'
  id: RoomId
  initialRoles: Roles[]
  lobbyPlayers: Player[]
  players: Hash<PlayerWerewolf>
  message?: string
  options: Options
}

export interface WerewolfLobby extends Omit<Lobby, 'type'> {
  type: 'werewolf-lobby'
  id: RoomId
  roles: Roles[]
  artifacts: Artifact[]
  options: Options
}

export type Werewolf = WerewolfGame | WerewolfLobby
