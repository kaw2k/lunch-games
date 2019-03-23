import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { CardRole } from '../../../../helpers/id'

export const Diseased = Card({
  role: CardRole('diseased'),
  weight: 3,
  team: 'villagers',
  emoji: Emoji('🤒'),
  cardCount: 1,
  description: `If you are eliminated by Werewolves, they don't get to kill the next night.`,
  hints: [
    `This is a fairly safe role to claim. Although you may not want to as your utility comes when you die.`,
  ],
  image: require('../../static/diseased.png'),
  profile: require('../../static/diseased-profile.png'),
  randomlySelectable: true,
  appearsBad: always(false),
  SetupRoleView: GenericSetupRoleView,
})
