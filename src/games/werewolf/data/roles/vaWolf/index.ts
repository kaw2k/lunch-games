import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { VAWolfSetup } from './setup'

export const VAWolf = Card({
  role: 'va wolf',
  weight: -2,
  team: 'villagers',
  emoji: Emoji('👵'),
  cardCount: 1,
  description: `You choose someone the first night, if you die that person dies as well.`,
  hints: [
    `As long as your linked partner is in the game DON'T come out. The werewolves will kill you and your linked person.`,
  ],
  image: require('./va-wolf.png'),
  profile: require('./va-wolf-profile.png'),
  preDeathAction: always({}),
  SetupView: VAWolfSetup,
  isActive: always(false),
  nightModeratorMessage: null,
  appearsBad: always(false),
})
