import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { CardRole } from '../../../../helpers/id'

export const Mayor = Card({
  role: CardRole('mayor'),
  weight: 2,
  team: 'villagers',
  emoji: Emoji('👩🏽‍🎤'),
  cardCount: 1,
  description: `Your vote counts as 2.`,
  hints: [
    `Make sure if you ever announce your role that you pronounce it "MARE".`,
  ],
  SetupRoleView: GenericSetupRoleView,
  image: require('../../static/mayor.png'),
  profile: require('../../static/mayor-profile.png'),
  randomlySelectable: true,
  appearsBad: always(false),
})
