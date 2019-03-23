import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { CardRole } from '../../../../helpers/id'

export const MadBomber = Card({
  role: CardRole('mad bomber'),
  weight: -2,
  team: 'villagers',
  emoji: Emoji('💣'),
  cardCount: 1,
  description: `If you are eliminated, the players immediately to your left and right are eliminated as well.`,
  hints: [
    `You really don't want to out your role, try as hard as you can to pretend to be something else`,
  ],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  randomlySelectable: true,
  SetupRoleView: GenericSetupRoleView,
  appearsBad: always(false),
})
