import * as React from 'react'
import { Typography } from '@material-ui/core'
import { PlayerWerewolf } from '../../interfaces/player'
import { WerewolfProfile } from '../werewolfProfile'

interface Props {
  allies: PlayerWerewolf[]
  showRole?: boolean
}

export const ViewAllies: React.SFC<Props> = ({ allies, showRole }) => {
  if (!allies.length) return null

  return (
    <>
      <Typography variant="h1">Allies</Typography>
      {allies.map(player => (
        <WerewolfProfile
          showLiving
          showRole={showRole}
          player={player}
          key={player.id}
        />
      ))}
    </>
  )
}
