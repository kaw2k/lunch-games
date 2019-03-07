import { PlayerWerewolf } from './player'
import { Lobby, RoomId } from '../../../interfaces/room'
import { Hash } from '../../../interfaces/hash'
import { Player, PlayerId } from '../../../interfaces/player'
import { Omit } from '@material-ui/core'
import { Actions } from './actions'
import { DelayAction } from './delayAction'
import { Teams } from './card'
import { Artifacts } from './artifact/artifacts'
import { Roles } from './card/cards'
import { Prompts } from './prompt'

interface WerewolfOptions {
  dayTimeLimit: number
  nightTimeLimit: number
  boogymanOP: boolean
  noFlip: boolean
  ghost: boolean
  killCult: boolean
  cursedArtifactAlwaysActive: boolean
  madBomberOnlyKillsAdjacent: boolean
  protectWolves: boolean
}

export interface Victory {
  team: Teams
  message: string
}

export type Story = { message: string; title?: boolean }

export interface WerewolfGame {
  type: 'werewolf-game'
  id: RoomId
  moderators: PlayerId[]
  ready: boolean
  // Sometimes new roles are added or removed mid game. Keep
  // track of what you came in with for bookkeeping
  initialRoles: Roles[]
  initialArtifacts: Artifacts[]
  // Used to see who is going to be in the lobby for the next game
  lobbyPlayers: Player[]
  // The players actively playing the game
  players: Hash<PlayerWerewolf>
  // The physical order of players, used by certain roles and artifacts
  playerOrder: PlayerId[]
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
  // Any actions that need to happen in the future
  delayedActions: DelayAction<Actions>[]

  numberOfPeopleToKill: number

  prismOfPower: null | PlayerId[]

  story: Story[]

  prompts: Prompts[]
  playersKilled: PlayerId[]
  playerActions: Actions[]
  playerReady: boolean
  time: 'day' | 'dawn' | 'night'
}

export interface WerewolfLobby extends Omit<Lobby, 'type'> {
  type: 'werewolf-lobby'
  id: RoomId
  roles: Roles[]
  artifacts: Artifacts[]
  options: WerewolfOptions
  moderators: PlayerId[]
}

export type Werewolf = WerewolfGame | WerewolfLobby

// People killed at night
// People reborn at night
// Private things to say to the moderator
// Artifact actions to play at dawn
// Have rebirth and reincarnation be prompts that pop up instead of automatically happen. This way if they are given to someone and it is activated, they still work
