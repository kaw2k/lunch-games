import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'

export const VillageIdiot = Card({
  role: 'village idiot',
  weight: 2,
  team: 'villagers',
  emoji: Emoji('🤡'),
  cardCount: 1,
  description: `You must always vote to eliminate, even yourself.`,
  hints: [],
  image: require('../../static/village-idiot.png'),
  profile: require('../../static/village-idiot-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  randomlySelectable: true,
  appearsBad: always(false),
})
