import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { NightMessageOrder } from '../../../interfaces/nightMessage'
import { GenericViewRole } from '../../../components/setupRole/genericViewRole'

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
  image: require('./cursed.png'),
  profile: require('./cursed-profile.png'),
  SetupView: GenericViewRole,
  appearsBad: always(false),
  isActive: always(false),
  NightModeratorView: null,
  NightPlayerView: null,
  nightOrder: NightMessageOrder.none,
})
