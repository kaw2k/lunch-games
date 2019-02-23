import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { NightMessageOrder } from '../../../interfaces/nightMessage'
import { NightModeratorView, NightPlayerView } from './night'
import { GenericSetupRoleView } from '../../../components/setupRole/genericSetupRole'

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
  nightOrder: NightMessageOrder.protection,
  SetupRoleView: GenericSetupRoleView,
  image: require('./bodyguard.png'),
  profile: require('./bodyguard-profile.png'),
  isActive: player => player.alive,
  appearsBad: always(false),
  NightModeratorView,
  NightPlayerView,
})
