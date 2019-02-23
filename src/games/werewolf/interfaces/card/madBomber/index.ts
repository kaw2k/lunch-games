import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { MadBomberSetup } from './setup'
import { NightMessageOrder } from '../../../interfaces/nightMessage'

export const MadBomber = Card({
  role: 'mad bomber',
  weight: -2,
  team: 'villagers',
  emoji: Emoji('💣'),
  cardCount: 1,
  description: `If you are eliminated, the players immediately to your left and right are eliminated as well.`,
  // deathMessage: `The mad bomber has died, players on either side dies as well`,
  hints: [
    `You really don't want to out your role, try as hard as you can to pretend to be something else`,
  ],
  image: require('./unknown.png'),
  profile: require('./unknown-profile.png'),
  SetupRoleView: MadBomberSetup,
  isActive: always(false),
  appearsBad: always(false),
  NightModeratorView: null,
  NightPlayerView: null,
  nightOrder: NightMessageOrder.none,
})
