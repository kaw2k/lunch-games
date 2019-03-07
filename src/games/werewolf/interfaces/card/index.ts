import { WerewolfGame } from '../game'
import { PlayerWerewolf } from '../player'
import { NightMessageOrder } from '../nightMessage'
import { Image } from '../image'
import { Emoji } from '../emoji'
import { SetupViewProps } from '../setupViewInterfaces'
import { PromptView } from '../prompt'

// ==========================
// Teams
// ==========================
export type Teams =
  | 'werewolves'
  | 'werewolves allies'
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

  weight: number
  cardCount: number
  description: string
  hints: string[]
  emoji: Emoji
  image: Image
  profile: Image

  OnDeathView?: PromptView

  // Views
  SetupRoleView: React.FC<SetupViewProps>

  night?: {
    title: string
    description?: string
    order: NightMessageOrder
    ModeratorView: PromptView
    PlayerView?: PromptView | null
  }
}

export const Card = <Role extends string>(card: Card<Role>): Card<Role> => card
