import * as React from 'react'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { Typography } from '@material-ui/core'
import { AvalonGameContext } from '../../../helpers/contexts'
import { ViewRole } from './game/viewRole'
import { FullScreenNotice } from '../../../components/fullScreenNotice'

interface Props {
  ready: () => void
}

export const GameSetup: React.SFC<Props> = ({ ready }) => {
  const { player } = React.useContext(AvalonGameContext)
  const [showRole, setShowRole] = React.useState(false)

  if (player.ready) {
    return <FullScreenNotice>Waiting for game to start...</FullScreenNotice>
  }

  if (!showRole) {
    return (
      <>
        <Typography align="center" variant="h2">
          READY TO SEE YOUR ROLE?
        </Typography>

        <ActionRow fixed>
          <Button color="green" onClick={() => setShowRole(true)}>
            show role
          </Button>
        </ActionRow>
      </>
    )
  }

  return <ViewRole button="ready" onDone={ready} disableButton={player.ready} />
}
