import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupWerewolfRoleView } from '../../components/setupRole/genericWerewolfViewRole'

export const FruitBrute = Card({
  role: 'fruit brute',
  weight: -3,
  team: 'werewolves',
  emoji: Emoji('🥕'),
  description: `You only eat fruit, so if all the other Werewolves are dead you can't eliminate anyone.`,
  hints: [`GL LOL, just claim vanillager or a good role like lycan.`],
  cardCount: 1,
  image: require('../../static/fruit-brute.png'),
  profile: require('../../static/fruit-brute-profile.png'),
  appearsBad: always(true),
  SetupRoleView: GenericSetupWerewolfRoleView,
  randomlySelectable: true,
})
