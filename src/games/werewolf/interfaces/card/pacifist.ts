import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'

export const Pacifist = Card({
  role: 'pacifist',
  weight: -1,
  team: 'villagers',
  emoji: Emoji('✌️'),
  cardCount: 1,
  description: `You may never vote to eliminate.`,
  hints: [],
  image: require('../../static/pacifist.png'),
  profile: require('../../static/pacifist-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  appearsBad: always(false),
})
