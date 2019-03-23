import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { CardRole } from '../../../../helpers/id'

export const Tanner = Card({
  role: CardRole('tanner'),
  cardCount: 1,
  emoji: Emoji('😭'),
  team: 'tanner',
  weight: -2,
  description: 'You only win if you are voted to be killed during the day.',
  hints: [
    `You want to act suspicious, but not too suspicious.`,
    `You can claim any role, even if a person comes out against you it works out.`,
    `Always claim to be good.`,
  ],
  image: require('../../static/tanner.png'),
  profile: require('../../static/tanner-profile.png'),
  appearsBad: always(false),
  randomlySelectable: true,
  SetupRoleView: GenericSetupRoleView,
})
