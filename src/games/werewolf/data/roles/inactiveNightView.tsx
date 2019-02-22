import * as React from 'react'
import { NightViewProps, secondaryNightMessage } from '../../interfaces/night'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'

export const InactiveNightView: React.SFC<NightViewProps> = ({
  done,
  player,
  callByName,
}) => {
  return (
    <>
      <Typography variant="h2">
        {callByName
          ? secondaryNightMessage(player)
          : 'Bodyguard, wake up! Protect someone, they will not die tonight.'}
      </Typography>

      <Typography component="em">
        DON'T READ THIS OUT LOUD: This role/player is either inactive or
        otherwise not in the game.
      </Typography>

      <ActionRow fixed>
        <Button onClick={() => done([])} color="green">
          skip
        </Button>
      </ActionRow>
    </>
  )
}
