import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { getActionCreator, Action } from '../../../interfaces/actions'
import { ViewRole } from '../../../components/viewRole/role'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { ActionRow } from '../../../../../components/actionRow'
import { Button } from '../../../../../components/button'

interface Props {
  ready: (actions: Action<any>[]) => void
}

export const MadBomberSetup: React.SFC<Props> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  if (!game.options.madBomberOnlyKillsAdjacent) {
    return (
      <>
        <ViewRole role={player.role} />
        <Typography variant="h1">Setup your role</Typography>
        <Typography gutterBottom>
          When the Mad Bomber dies, the players to either side of you (skipping
          gaps) dies as well.
        </Typography>
        <ActionRow fixed>
          <Button color="green" onClick={() => ready([])}>
            done
          </Button>
        </ActionRow>
      </>
    )
  }

  return (
    <>
      <ViewRole role={player.role} />
      <Typography variant="h1">Setup your role</Typography>
      <Typography gutterBottom>
        When the Mad Bomber diesVA Wolf dies, the person you choose dies as
        well.
      </Typography>
      <ChoosePlayers
        players={game.players}
        removePlayer
        numToSelect={2}
        doneText="ready"
        onDone={([left, right]) =>
          ready([
            getActionCreator('link player')(left, player.id),
            getActionCreator('link player')(right, player.id),
          ])
        }
        doneProps={disabled => ({
          color: disabled ? 'red' : 'green',
        })}
      />
    </>
  )
}
