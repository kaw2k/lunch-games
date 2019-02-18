import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'

export const Villager = Card({
  role: 'villager',
  team: 'villagers',
  description: 'You are job is to find the werewolves and kill them',
  hints: [],
  weight: 1,
  cardCount: 10,
  appearsBad: always(false),
  emoji: Emoji('👩‍🌾'),
  image: require('./villager.png'),
  profile: require('./villager-profile.png'),
  preDeathAction: always({}),
  isActive: always(false),
  nightModeratorMessage: null,
})
