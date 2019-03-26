import * as React from 'react'
import { Button } from '../../../components/button'
import { SecretHitlerGameContext } from '../../../helpers/contexts'
import { ViewRole } from './game/viewRole'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../components/actionRow'
import { FullScreenNotice } from '../../../components/fullScreenNotice'

interface Props {
  ready: () => void
}

export const GameSetup: React.SFC<Props> = ({ ready }) => {
  const { player } = React.useContext(SecretHitlerGameContext)
  const [showRole, setShowRole] = React.useState(false)

  if (player.ready) {
    return <FullScreenNotice>Waiting for game to start...</FullScreenNotice>
  }

  if (!showRole) {
    return (
      <>
        <Typography gutterBottom variant="h2" align="center">
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
