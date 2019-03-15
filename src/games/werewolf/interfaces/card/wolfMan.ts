import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupWerewolfRoleView } from '../../components/setupRole/genericWerewolfViewRole'

export const WolfMan = Card({
  role: 'wolf man',
  weight: -9,
  team: 'werewolves',
  emoji: Emoji('🦁'),
  cardCount: 1,
  description: `Each night, wake with the other wolves. The seer sees you as a villager.`,
  hints: [
    `Try to get yourself inspected by the seer to claim your innocence`,
    `Artifacts will still reveal your true role`,
  ],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  appearsBad: always(true),
  randomlySelectable: true,
  SetupRoleView: GenericSetupWerewolfRoleView,
})
