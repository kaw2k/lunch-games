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
import { Id } from '../../../helpers/id'

interface WerewolfOptions {
  dayTimeLimit: number
  nightTimeLimit: number
  moderatorOnly: boolean
  boogymanOP: boolean
  noFlip: boolean
  ghost: boolean
  killCult: boolean
  cursedArtifactAlwaysActive: boolean
  werewolfArtifactAlwaysActive: boolean
  madBomberOnlyKillsAdjacent: boolean
  beholderSeesAllSeers: boolean
  protectWolves: boolean
  sasquatchIsChill: boolean
  luckyLeprechaun: boolean
}

export interface Victory {
  team: Teams
  message: string
}

export interface ModeratorMessage {
  id: Id
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
  // Displays a countdown for display during the day
  timer: number | null
  // An array of actions taken during the night
  actions: Actions[]
  // Any actions that need to happen in the future
  delayedActions: DelayAction<Actions>[]

  numberOfPeopleToKill: number

  prismOfPower: null | PlayerId[]

  story: Story[]

  // These are messages that the moderator sees on all screens
  // Used for things like "so and so died"
  notifications: ModeratorMessage[]

  prompts: {
    // The active prompt changes the screen the moderator and
    // any affected players see
    active: Prompts | null
    // If there are an array of prompts we force the moderator
    // To deal with them. The moderator then can dismiss or act on those prompts
    items: Prompts[]
    show: boolean
  }

  // playersKilled: PlayerId[]
  killedAtNight: PlayerId[]
  killedAtDawn: PlayerId[]
  killedAtDay: PlayerId[]

  // An object that the players can modify signalling to the moderator
  // that they have performed their actions
  playerInteraction: {
    actions: Actions[]
    ready: boolean
  }

  // Used to change the overall layout of the screen. If you are night or day
  // prompts behave slightly different
  time: 'day' | 'dawn' | 'night'
  day: number
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
