import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { CardRole } from '../../../../helpers/id'

export const Villager = Card({
  role: CardRole('villager'),
  team: 'villagers',
  description: 'You are job is to find the werewolves and kill them',
  hints: [],
  weight: 1,
  cardCount: 10,
  appearsBad: always(false),
  emoji: Emoji('👩‍🌾'),
  image: require('../../static/villager.png'),
  profile: require('../../static/villager-profile.png'),
  randomlySelectable: true,
  SetupRoleView: GenericSetupRoleView,
})
