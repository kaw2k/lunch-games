import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'

export const Sasquatch = Card({
  role: 'sasquatch',
  weight: -2,
  team: 'villagers',
  emoji: Emoji('😴'),
  cardCount: 1,
  description: `You are on the village team unless a day ends without someone dying. If that happens you switch to the werewolf team.`,
  hints: [
    `You always appear bad to the seer regardless of what team you are on.`,
    `When you switch teams you transform into a werewolf.`,
  ],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  appearsBad: always(true),
  SetupRoleView: GenericSetupRoleView,
})
