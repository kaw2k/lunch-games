import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { NightMessageOrder } from '../../../interfaces/nightMessage'
import { NightModeratorView, NightPlayerView } from './night'
import { GenericSetupRoleView } from '../../../components/setupRole/genericSetupRole'

export const CultLeader = Card({
  role: 'cult leader',
  weight: 1,
  team: 'cult leader',
  emoji: Emoji('🍷'),
  cardCount: 1,
  description: `Every night wake up to indoctrinate people into your cult. You win if all living players are in your cult.`,
  hints: [
    `Indoctrinate people who you think won't die early`,
    `Your cult dies with you, so DON'T come out as the cult leader. You are a high priority role to kill.`,
  ],
  nightOrder: NightMessageOrder.misc,
  SetupRoleView: GenericSetupRoleView,
  NightModeratorView,
  NightPlayerView,
  image: require('./cult-leader.png'),
  profile: require('./cult-leader-profile.png'),
  isActive: always(true),
  appearsBad: always(false),
})
