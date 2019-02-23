import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { NightMessageOrder } from '../../../interfaces/nightMessage'
import { GenericViewRole } from '../../../components/setupRole/genericViewRole'

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
  SetupView: GenericViewRole,
  isActive: player => player.alive,
  // nightModeratorMessage: {
  //   message: `priest, bless someone. if they are ever killed you will bless another person next night`,
  // },
  appearsBad: always(false),
  NightModeratorView: null,
  NightPlayerView: null,
  nightOrder: NightMessageOrder.protection,
})
