import * as React from 'react'
import { Typography } from '@material-ui/core'
import { PlayerWerewolf } from '../../interfaces/player'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Actions } from '../../interfaces/actions'

export const NoNightActionView: React.SFC<{
  data: PlayerWerewolf | string
  done: (actions: Actions[]) => void
}> = ({ data, done }) => {
  const title =
    typeof data === 'string'
      ? data
      : `${data.name || data.id}, wake up and do the thing!`

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography component="em">No action necessary</Typography>

      <ActionRow fixed>
        <Button color="green" onClick={() => done([])}>
          continue
        </Button>
      </ActionRow>
    </>
  )
}
