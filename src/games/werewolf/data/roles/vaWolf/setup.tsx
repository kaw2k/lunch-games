import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { ViewRole } from '../../../components/viewRole/role'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { Actions, linkPlayer } from '../../../interfaces/actions'

interface Props {
  ready: (actions: Actions[]) => void
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
          ready([linkPlayer({ target, source: player.id })])
        }
        doneProps={disabled => ({
          color: disabled ? 'red' : 'green',
        })}
      />
    </>
  )
}
