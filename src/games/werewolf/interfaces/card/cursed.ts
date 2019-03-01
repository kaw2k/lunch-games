import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'

export const Cursed = Card({
  role: 'cursed',
  weight: -3,
  team: 'villagers',
  emoji: Emoji('🧟‍'),
  cardCount: 1,
  description: `You are a regular villager until the werewolves try to kill you at night, then you transform into a werewolf and wake up with them.`,
  hints: [
    `Your role will update if you transform into a werewolf. Make sure to check, especially if nothing happened the previous night!`,
    `Try really hard to get the werewolves to kill you.`,
  ],
  image: require('../../static/cursed.png'),
  profile: require('../../static/cursed-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  appearsBad: always(false),
  isActive: always(false),
})
