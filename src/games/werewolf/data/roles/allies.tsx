import * as React from 'react'
import { Typography } from '@material-ui/core'
import { PlayerWerewolf } from '../../interfaces/player'
import { WerewolfProfile } from '../../components/werewolfProfile'

interface Props {
  allies: PlayerWerewolf[]
}

export const ViewAllies: React.SFC<Props> = ({ allies }) => {
  if (!allies.length) return null

  return (
    <>
      <Typography variant="h1">Allies</Typography>
      {allies.map(player => (
        <WerewolfProfile showRole player={player} key={player.id} />
      ))}
    </>
  )
}
