import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { NightMessageOrder } from '../../../interfaces/nightMessage'
import { GenericSetupRoleView } from '../../../components/setupRole/genericSetupRole'

export const Tanner = Card({
  role: 'tanner',
  cardCount: 1,
  emoji: Emoji('😭'),
  team: 'tanner',
  weight: -2,
  description: 'You only win if you are voted to be killed during the day.',
  hints: [
    `You want to act suspicious, but not too suspicious.`,
    `You can claim any role, even if a person comes out against you it works out.`,
    `Always claim to be good.`,
  ],
  image: require('./tanner.png'),
  profile: require('./tanner-profile.png'),
  isActive: always(false),
  appearsBad: always(false),
  SetupRoleView: GenericSetupRoleView,
  NightModeratorView: null,
  NightPlayerView: null,
  nightOrder: NightMessageOrder.none,
})
