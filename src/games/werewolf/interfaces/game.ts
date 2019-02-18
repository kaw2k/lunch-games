import { PlayerWerewolf } from './player'
import { Lobby, RoomId } from '../../../interfaces/room'
import { Hash } from '../../../interfaces/hash'
import { Player } from '../../../interfaces/player'
import { Omit } from '@material-ui/core'
import { Actions } from './actions'
import { DelayAction } from './delayAction'
import { Roles } from '../data/roles'
import { ArtifactState } from './artifact'

interface WerewolfOptions {
  timeLimit: number
  boogymanOP: boolean
  noFlip: boolean
  ghost: boolean
  killCult: boolean
  artifacts: {
    cursed: {
      alwaysActive: boolean
    }
  }
}

export interface WerewolfGame {
  type: 'werewolf-game'
  id: RoomId
  // Sometimes new roles are added or removed mid game. Keep
  // track of what you came in with for bookkeeping
  initialRoles: Roles[]
  // Used to see who is going to be in the lobby for the next game
  lobbyPlayers: Player[]
  // The players actively playing the game
  players: Hash<PlayerWerewolf>
  // Any message to display to all users
  message: string | null
  victory: string | null
  // Options to modify the game
  options: WerewolfOptions
  // An indicator of what day it is
  dayCount: number
  // Displays a countdown for display during the day
  timer: number | null
  // An array of actions taken during the night
  actions: Actions[]
  // Any actions that need to happen in the future
  delayedActions: DelayAction<Actions>[]
}

export interface WerewolfLobby extends Omit<Lobby, 'type'> {
  type: 'werewolf-lobby'
  id: RoomId
  roles: Roles[]
  artifacts: ArtifactState[]
  options: WerewolfOptions
}

export type Werewolf = WerewolfGame | WerewolfLobby
