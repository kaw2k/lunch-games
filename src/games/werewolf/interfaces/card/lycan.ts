import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'

export const Lycan = Card({
  role: 'lycan',
  weight: -1,
  team: 'villagers',
  emoji: Emoji('🦊'),
  cardCount: 1,
  description: `You are on the villager team but appear like a werewolf to the Seer.`,
  hints: [
    `I'm likin' that.`,
    `It pays to come out as the lycan early in the game. That way others can't claim it.`,
  ],
  image: require('../../static/lycan.png'),
  profile: require('../../static/lycan-profile.png'),
  appearsBad: always(true),
  SetupRoleView: GenericSetupRoleView,
})
