import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupWerewolfRoleView } from '../../components/setupRole/genericWerewolfViewRole'
import { CardRole } from '../../../../helpers/id'

export const FangFace = Card({
  role: CardRole('fang face'),
  weight: -5,
  team: 'werewolves',
  emoji: Emoji('😸'),
  cardCount: 1,
  description: `You only wake up with the Werewolf team on the first night. After that, you'll only wake up if there are no other Werewolves left.`,
  hints: [
    `Remember who the other werewolves are, also moderator will try to tap you to tell you you should wake up when you need to.`,
  ],
  image: require('../../static/fang-face.png'),
  profile: require('../../static/fang-face-profile.png'),
  appearsBad: always(true),
  SetupRoleView: GenericSetupWerewolfRoleView,
})
