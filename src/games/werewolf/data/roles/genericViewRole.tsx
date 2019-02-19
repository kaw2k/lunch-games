import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { ViewRoleContainer } from './viewRoleContainer'

interface Props {
  ready: (actions: any[]) => void
}

export const GenericViewRole: React.SFC<Props> = ({ ready }) => {
  const { player } = React.useContext(WerewolfGameContext)
  return (
    <ViewRoleContainer player={player}>
      <ActionRow fixed>
        <Button onClick={() => ready([])} color="green">
          ready
        </Button>
      </ActionRow>
    </ViewRoleContainer>
  )
}
