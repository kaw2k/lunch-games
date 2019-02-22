import { WerewolfGame } from './game'
import { PlayerWerewolf } from './player'

// Roles
import { NightMessageOrder } from './nightMessage'
import { Image } from './image'
import { Emoji } from './emoji'

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
  SetupView: React.FC<{ ready: (actions: any[]) => void }>
  NightModeratorView: React.FC<{
    player: PlayerWerewolf
    done: () => void
  }> | null
  NightPlayerView: React.FC<{ player: PlayerWerewolf; done: () => void }> | null
}

export const Card = <Role extends string>(card: Card<Role>): Card<Role> => card
