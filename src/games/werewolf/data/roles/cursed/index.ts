import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'

export const Cursed = Card({
  role: 'cursed',
  weight: -3,
  team: 'villagers',
  emoji: Emoji('🧟‍'),
  cardCount: 1,
  description: `You are a regular villager until the werewolves try to kill you at night, then you transform into a werewolf and wake up with them.`,
  hints: [`Try really hard to get the werewolves to kill you.`],
  image: require('./cursed.png'),
  profile: require('./cursed-profile.png'),
  appearsBad: always(false),
  isActive: always(false),
  nightModeratorMessage: null,
  preDeathAction: always({}),
})
