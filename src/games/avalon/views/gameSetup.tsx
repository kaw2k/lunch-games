import * as React from 'react'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { Typography } from '@material-ui/core'
import { AvalonGameContext } from '../../../helpers/contexts'
import { ViewRole } from './game/viewRole'

interface Props {
  ready: () => void
}

export const GameSetup: React.SFC<Props> = ({ ready }) => {
  const { player } = React.useContext(AvalonGameContext)
  const [showRole, setShowRole] = React.useState(false)

  if (player.ready) {
    return (
      <>
        <Typography align="center" variant="h2">
          Waiting for game to start...
        </Typography>
      </>
    )
  }

  if (!showRole) {
    return (
      <>
        <Typography align="center" variant="h2">
          READY TO SEE YOUR ROLE?
        </Typography>

        <ActionRow fixed>
          <Button color="black" onClick={() => setShowRole(true)}>
            show role
          </Button>
        </ActionRow>
      </>
    )
  }

  return <ViewRole button="ready" onDone={ready} disableButton={player.ready} />
}
