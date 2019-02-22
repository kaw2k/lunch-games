import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Action } from '../../interfaces/actions'
import { ViewRole } from '../../components/viewRole/role'

interface Props {
  ready: (actions: Action<any>[]) => void
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
