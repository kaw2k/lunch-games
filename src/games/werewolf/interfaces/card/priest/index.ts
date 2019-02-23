import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { NightMessageOrder } from '../../../interfaces/nightMessage'
import { GenericSetupRoleView } from '../../../components/setupRole/genericSetupRole'
import { NightModeratorView, NightPlayerView } from './night'

export const Priest = Card({
  role: 'priest',
  weight: 3,
  team: 'villagers',
  emoji: Emoji('🙏'),
  cardCount: 1,
  description: `You bless a player each night. You can't bless a different player until that person is targeted.`,
  hints: [
    `Bless yourself first, then try to protect a good person with powers after you are targeted.`,
    `Sometimes it can be useful to let the team know who you protected AFTER they have been attacked, it will help the team know who is good.`,
  ],
  image: require('./priest.png'),
  profile: require('./priest-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  isActive: always(true),
  appearsBad: always(false),
  NightModeratorView,
  NightPlayerView,
  nightOrder: NightMessageOrder.protection,
})
