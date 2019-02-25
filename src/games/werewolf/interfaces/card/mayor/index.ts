import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { GenericSetupRoleView } from '../../../components/setupRole/genericSetupRole'

export const Mayor = Card({
  role: 'mayor',
  weight: 2,
  team: 'villagers',
  emoji: Emoji('👩🏽‍🎤'),
  cardCount: 1,
  description: `Your vote counts as 2.`,
  hints: [
    `Make sure if you ever announce your role that you pronounce it "MARE".`,
  ],
  SetupRoleView: GenericSetupRoleView,
  image: require('./mayor.png'),
  profile: require('./mayor-profile.png'),
  isActive: always(false),
  appearsBad: always(false),
})
