import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { ViewAllies } from '../../components/viewRole/allies'
import values from 'ramda/es/values'
import { isWerewolf } from '../../helpers/isWerewolf'
import { Action } from '../../interfaces/actions'
import { ViewRole } from '../../components/viewRole/role'

interface Props {
  ready: (actions: Action<any>[]) => void
}

export const GenericWerewolfViewRole: React.SFC<Props> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ViewRole role={player.role} />
      <ViewAllies
        allies={values(game.players).filter(
          p => p.id !== player.id && isWerewolf(p, game)
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
