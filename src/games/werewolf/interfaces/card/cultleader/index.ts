import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { NightMessageOrder } from '../../../interfaces/nightMessage'
import { NightModeratorView, NightPlayerView } from './night'
import { GenericViewRole } from '../../../data/roles/genericViewRole'

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
  // nightModeratorMessage: {
  //   message:
  //     'cult leader, indoctrinate someone, they are now part of your cult',
  //   },
  nightOrder: NightMessageOrder.misc,
  SetupView: GenericViewRole,
  NightModeratorView,
  NightPlayerView,
  image: require('./cult-leader.png'),
  profile: require('./cult-leader-profile.png'),
  isActive: always(false),
  appearsBad: always(false),
})