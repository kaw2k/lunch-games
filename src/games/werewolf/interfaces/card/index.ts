import { WerewolfGame } from '../game'
import { PlayerWerewolf } from '../player'

import { NightMessageOrder } from '../nightMessage'
import { Image } from '../image'
import { Emoji } from '../emoji'
import { NightViewProps } from '../night'
import { Actions } from '../actions'

// Roles
import { Bodyguard } from './bodyguard'
import { CultLeader } from './cultleader'
import { Cursed } from './cursed'
import { Mayor } from './mayor'
import { Priest } from './priest'
import { Tanner } from './tanner'
import { Villager } from './villager'
import { Werewolf } from './werewolf'
import { VAWolf } from './vaWolf'
import { MadBomber } from './madBomber'
import { Unpack } from '../../../../helpers/unpack'

// ==========================
// Teams
// ==========================
export type Teams =
  | 'werewolves'
  | 'villagers'
  | 'tanner'
  | 'vampires'
  | 'cult leader'
  | 'chewks'
  | 'boogyman'

// ==========================
// Cards
// ==========================
export interface Card<Role extends string = string> {
  // The unique role of a card
  role: Role
  // Which faction the player belongs to
  team: Teams
  // If the role appears like a werewolf
  appearsBad: (player: PlayerWerewolf, game: WerewolfGame) => boolean

  // Some roles only activate at night after something happens
  // like bloody marry or apprentice seer
  isActive: (player: PlayerWerewolf, game: WerewolfGame) => boolean

  weight: number
  cardCount: number
  description: string
  hints: string[]
  emoji: Emoji
  image: Image
  profile: Image
  nightOrder: NightMessageOrder

  // Views
  // TODO: :sob:
  SetupView: React.FC<{ ready: (actions: Actions[]) => void }>
  NightModeratorView: React.FC<NightViewProps> | null
  NightPlayerView: React.FC<NightViewProps> | null
}

export const Card = <Role extends string>(card: Card<Role>): Card<Role> => card

export const Cards = [
  Bodyguard,
  CultLeader,
  Cursed,
  Mayor,
  Priest,
  Tanner,
  Villager,
  Werewolf,
  VAWolf,
  MadBomber,
]

export const Roles = Cards.map(role => role.role)
export type Roles = Unpack<typeof Roles>

export const getCard = <Role extends Roles>(role: Role): Card<Role> =>
  Cards.find(r => r.role === role) as Card<Role>
