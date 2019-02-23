import { WerewolfGame } from '../game'
import { PlayerWerewolf } from '../player'
import { NightMessageOrder } from '../nightMessage'
import { Image } from '../image'
import { Emoji } from '../emoji'
import { NightViewProps } from '../nightViewInterfaces'
import { SetupViewProps } from '../setupViewInterfaces'

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
  SetupRoleView: React.FC<SetupViewProps>
  NightModeratorView: React.FC<NightViewProps> | null
  NightPlayerView: React.FC<NightViewProps> | null
}

export const Card = <Role extends string>(card: Card<Role>): Card<Role> => card
