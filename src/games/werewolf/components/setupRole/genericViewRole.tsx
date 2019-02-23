import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { ViewRole } from '../viewRole/role'
import { Actions } from '../../interfaces/actions'

interface Props {
  ready: (actions: Actions[]) => void
}

export const GenericViewRole: React.SFC<Props> = ({ ready }) => {
  const { player } = React.useContext(WerewolfGameContext)
  return (
    <>
      <ViewRole role={player.role} />
      <ActionRow fixed>
        <Button onClick={() => ready([])} color="green">
          ready
        </Button>
      </ActionRow>
    </>
  )
}
