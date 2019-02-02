import { Opaque } from '../../interfaces/opaque'
import always from 'ramda/es/always'
import { WerewolfGame } from './game'
import { PlayerWerewolf } from './player'

// ==========================
// Uniques
// ==========================
type Image = Opaque<'image', string>
type Emoji = Opaque<'emoji', string>
const Emoji = (char: string) => char as Emoji

// ==========================
// Teams
// ==========================
type Teams =
  | 'wolf'
  | 'minion'
  | 'villager'
  | 'tanner'
  | 'vampire'
  | 'cult leader'
  | 'mason'
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
  appearsLikeAWerewolf: (game: WerewolfGame, player: PlayerWerewolf) => boolean

  // Prompts the moderator that the role has a night action
  nightMessage: string | null
  // Prompts the moderator when the character dies to
  // perform a certain action
  deathMessage: string | null

  weight: number
  cardCount: number
  description: string
  hints: string[]
  emoji: Emoji
  image: Image
  profile: Image

  //   preDeathAction?: (player: Player) => Prompt
  // Custom actions the role will always have available
  //   actions?: Actions[]
}
const Card = <Role extends string>(card: Card<Role>): Card<Role> => card
export const AllCards = [
  Card({
    role: 'villager',
    team: 'villager',
    description: 'You are job is to find the werewolves and kill them',
    hints: [],
    weight: 1,
    cardCount: 10,
    appearsLikeAWerewolf: always(false),
    emoji: Emoji('👩‍🌾'),
    image: require('../assets/villager.png'),
    profile: require('../assets/villager-profile.png'),
    deathMessage: null,
    nightMessage: null,
  }),

  Card({
    role: 'werewolf',
    team: 'wolf',
    description: `You are a werewolf, Kill everyone who's not a werewolf.`,
    hints: [
      'Never say you are bad.',
      'Claiming lycan works sometimes if the lycan is in the game.',
      'If a handful of people are eliminated already, try claiming seer or apprentice seer.',
    ],
    weight: -6,
    cardCount: 3,
    appearsLikeAWerewolf: always(true),
    emoji: Emoji('🐺'),
    image: require('../assets/werewolf.png'),
    profile: require('../assets/werewolf-profile.png'),
    deathMessage: null,
    nightMessage: null,
  }),
]

export type Roles = (typeof AllCards)[0]['role']
export const Roles = AllCards.map(role => role.role)
export const getCard = <Role extends Roles>(role: Role): Card<Role> =>
  AllCards.find(r => r.role === role) as Card<Role>
