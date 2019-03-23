import * as React from 'react'
import { always, values } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { isRole } from './cards'
import { Actions } from '../actions'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { ViewRole } from '../../components/viewRole/role'
import { ViewAllies } from '../../components/viewRole/allies'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { CardRole } from '../../../../helpers/id'

interface Props {
  ready: (actions: Actions[]) => void
}

export const SetupRoleView: React.SFC<Props> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ViewRole role={player.role} />
      <ViewAllies
        allies={values(game.players).filter(
          p => p.id !== player.id && isRole(p, Mason.role)
        )}
      />

      <ActionRow fixed>
        <Button onClick={() => ready([])} color="green">
          ready
        </Button>
      </ActionRow>
    </>
  )
}

export const Mason = Card({
  role: CardRole('mason'),
  weight: 2,
  team: 'villagers',
  emoji: Emoji('👁'),
  cardCount: 3,
  description: `You are in a secret society and know who the other masons are.`,
  hints: [
    `Don't say the word Mason, or reference any sort of secret club. If you do, you die that night.`,
    `Try to use your knowledge of knowing other good people to help guide others in the right direction.`,
  ],
  image: require('../../static/mason.png'),
  profile: require('../../static/mason-profile.png'),
  appearsBad: always(false),
  SetupRoleView: SetupRoleView,
})
