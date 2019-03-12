import * as React from 'react'
import { ActionRow } from '../../../../../components/actionRow'
import { Button } from '../../../../../components/button'
import { Typography } from '@material-ui/core'
import { WerewolfSpectateGame } from '../spectate'

interface Props {}

export const WerewolfDead: React.SFC<Props> = ({}) => {
  const [spectateVisible, showSpectate] = React.useState(false)

  if (!spectateVisible) {
    return (
      <>
        <Typography variant="h2">Ur ded, lol</Typography>

        <ActionRow fixed>
          <Button
            color="green"
            confirm="make sure no one is looking"
            onClick={() => showSpectate(true)}>
            start spectating
          </Button>
        </ActionRow>
      </>
    )
  }

  return <WerewolfSpectateGame />
}
