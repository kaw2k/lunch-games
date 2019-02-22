import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { getActionCreator, Action } from '../../../interfaces/actions'
import { ViewRole } from '../../../components/viewRole/role'
import { ChoosePlayers } from '../../../../../components/choosePlayers'

interface Props {
  ready: (actions: Action<any>[]) => void
}

export const VAWolfSetup: React.SFC<Props> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ViewRole role={player.role} />
      <Typography variant="h1">Setup your role</Typography>
      <Typography gutterBottom>
        When VA Wolf dies, the person you choose dies as well.
      </Typography>
      <ChoosePlayers
        players={game.players}
        removePlayer
        doneText="ready"
        onDone={([target]) =>
          ready([getActionCreator('link player')(target, player.id)])
        }
        doneProps={disabled => ({
          color: disabled ? 'red' : 'green',
        })}
      />
    </>
  )
}
