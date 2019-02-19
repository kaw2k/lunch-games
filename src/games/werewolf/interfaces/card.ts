import { WerewolfGame } from './game'
import { PlayerWerewolf } from './player'
import { PromptModerator, PromptPlayer } from './prompt'

// Roles
import { NightMessage } from './nightMessage'
import { Image } from './image'
import { Emoji } from './emoji'

// ==========================
// Teams
// ==========================
type Teams =
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

  // Prompts the moderator that the role has a night action
  nightModeratorMessage: NightMessage | null
  // Some roles only activate at night after something happens
  // like bloody marry or apprentice seer
  isActive: (player: PlayerWerewolf, game: WerewolfGame) => boolean
  // Some roles have actions that need to happen when they die,
  // let the moderator know and give them some options
  preDeathAction: (
    player: PlayerWerewolf,
    game: WerewolfGame
  ) => { moderator?: PromptModerator; player?: PromptPlayer }
  // TODO: :sob:
  SetupView: React.FC<{ ready: (actions: any[]) => void }>
  weight: number
  cardCount: number
  description: string
  hints: string[]
  emoji: Emoji
  image: Image
  profile: Image
}

export const Card = <Role extends string>(card: Card<Role>): Card<Role> => card
