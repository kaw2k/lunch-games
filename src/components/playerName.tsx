import * as React from 'react'
import { Player } from '../interfaces/player'
import { Typography } from '@material-ui/core'

interface Props {
  player: Player
  bold?: boolean
}

export const PlayerName: React.SFC<Props> = ({ player, bold }) => {
  return (
    <Typography variant={bold ? 'h5' : undefined} inline>
      {playerName(player)}
    </Typography>
  )
}

export const playerName = (player: Player) => player.name || player.id
