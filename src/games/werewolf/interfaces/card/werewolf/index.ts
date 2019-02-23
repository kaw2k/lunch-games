import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { NightMessageOrder } from '../../../interfaces/nightMessage'
import { GenericWerewolfViewRole } from '../../../components/setupRole/genericWerewolfViewRole'

export const Werewolf = Card({
  role: 'werewolf',
  team: 'werewolves',
  description: `You are a werewolf, Kill everyone who's not a werewolf.`,
  hints: [
    'Never say you are bad.',
    'Claiming lycan works sometimes if the lycan is in the game.',
    'If a handful of people are eliminated already, try claiming seer or apprentice seer.',
  ],
  weight: -6,
  cardCount: 3,
  appearsBad: always(true),
  emoji: Emoji('🐺'),
  image: require('./werewolf.png'),
  profile: require('./werewolf-profile.png'),
  isActive: always(true),
  SetupView: GenericWerewolfViewRole,
  NightModeratorView: null,
  NightPlayerView: null,
  nightOrder: NightMessageOrder.werewolf,
})
