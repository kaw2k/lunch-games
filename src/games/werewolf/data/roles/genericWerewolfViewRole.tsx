import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { ViewAllies } from './allies'
import values from 'ramda/es/values'
import { isWerewolf } from '../../helpers/isWerewolf'
import { ViewRoleContainer } from './viewRoleContainer'

interface Props {
  ready: (actions: any[]) => void
}

export const GenericWerewolfViewRole: React.SFC<Props> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  return (
    <ViewRoleContainer player={player}>
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
    </ViewRoleContainer>
  )
}
