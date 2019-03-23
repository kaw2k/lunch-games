import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { CardRole } from '../../../../helpers/id'

export const Pacifist = Card({
  role: CardRole('pacifist'),
  weight: -1,
  team: 'villagers',
  emoji: Emoji('✌️'),
  cardCount: 1,
  description: `You may never vote to eliminate.`,
  hints: [],
  image: require('../../static/pacifist.png'),
  profile: require('../../static/pacifist-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  randomlySelectable: true,
  appearsBad: always(false),
})
