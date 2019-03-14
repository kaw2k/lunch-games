import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'

export const Prince = Card({
  role: 'prince',
  weight: 3,
  team: 'villagers',
  emoji: Emoji('🤴'),
  cardCount: 1,
  description: `You can't be voted to be eliminated. Reveal your role if you're voted out and stay in the game.`,
  hints: [`You can claim this role early on, nbd.`],
  image: require('../../static/prince.png'),
  profile: require('../../static/prince-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  appearsBad: always(false),
})
