import { PlayerWerewolf } from './player'
import { Lobby, RoomId } from '../../../interfaces/room'
import { Hash } from '../../../interfaces/hash'
import { Player, PlayerId } from '../../../interfaces/player'
import { Omit } from '@material-ui/core'
import { Actions } from './actions'
import { DelayAction } from './delayAction'
import { Roles } from '../data/roles'
import { AllArtifacts } from '../data/artifacts'
import { Teams } from './card'

interface WerewolfOptions {
  dayTimeLimit: number
  nightTimeLimit: number
  boogymanOP: boolean
  noFlip: boolean
  ghost: boolean
  killCult: boolean
  cursedArtifactAlwaysActive: boolean
  madBomberOnlyKillsAdjacent: boolean
}

export interface Victory {
  team: Teams
  message: string
}

export type NightPrompt =
  | {
      type: 'primary'
      players: PlayerId[]
      role: Roles
    }
  | {
      type: 'secondary'
      players: PlayerId[]
      role: Roles | null
    }

export interface WerewolfGame {
  type: 'werewolf-game'
  id: RoomId
  moderators: PlayerId[]
  ready: boolean
  // Sometimes new roles are added or removed mid game. Keep
  // track of what you came in with for bookkeeping
  initialRoles: Roles[]
  initialArtifacts: AllArtifacts[]
  // Used to see who is going to be in the lobby for the next game
  lobbyPlayers: Player[]
  // The players actively playing the game
  players: Hash<PlayerWerewolf>
  // Any message to display to all users
  message: string | null
  victory: Victory | null
  // Options to modify the game
  options: WerewolfOptions
  // An indicator of what day it is
  dayCount: number
  // Displays a countdown for display during the day
  timer: number | null
  // An array of actions taken during the night
  actions: Actions[]

  night: {
    kills: PlayerId[]
    story: string[]
    // The roles remaining to go through at night
    prompts: null | NightPrompt[]
  }
  artifactState: {
    // Prism of power can set 3 people to be targets at night
    nightTargets: null | PlayerId[]
  }

  // Any actions that need to happen in the future
  delayedActions: DelayAction<Actions>[]
}

export interface WerewolfLobby extends Omit<Lobby, 'type'> {
  type: 'werewolf-lobby'
  id: RoomId
  roles: Roles[]
  artifacts: AllArtifacts[]
  options: WerewolfOptions
  moderators: PlayerId[]
}

export type Werewolf = WerewolfGame | WerewolfLobby
