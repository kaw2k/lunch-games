import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { NightMessageOrder } from '../../../interfaces/nightMessage'
import { GenericViewRole } from '../genericViewRole'

export const Bodyguard = Card({
  role: 'bodyguard',
  weight: 3,
  team: 'villagers',
  emoji: Emoji('👮‍♀️'),
  cardCount: 1,
  description: `Each night, choose a player who cannot be killed that night.`,
  hints: [
    `Pick yourself to start, if the Seer reveals themselves, start picking them, unless the werewolves know you're the body guard, then protect yourself.`,
  ],
  nightModeratorMessage: {
    message: 'bodyguard, protect someone',
    order: NightMessageOrder.protection,
  },
  SetupView: GenericViewRole,
  image: require('./bodyguard.png'),
  profile: require('./bodyguard-profile.png'),
  preDeathAction: always({}),
  isActive: player => player.alive,
  appearsBad: always(false),
})
