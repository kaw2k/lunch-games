import * as React from 'react'
import { PlayerWerewolf } from '../interfaces/player'
import { Profile, Props as ProfileProps } from '../../../components/profile'
import { Typography } from '@material-ui/core'

interface Props extends Partial<ProfileProps> {
  player: PlayerWerewolf
  showReady?: boolean
  showRole?: boolean
  showLiving?: boolean
}

export const WerewolfProfile: React.SFC<Props> = ({
  player,
  showRole,
  showReady,
  showLiving,
  ...props
}) => {
  return (
    <Profile
      image={player.profileImg}
      text={player.name || player.id}
      subtext={
        <>
          {showRole && <Typography>{player.role}</Typography>}
          {showLiving && (
            <Typography>{player.alive ? 'living' : 'dead'}</Typography>
          )}
          {showReady && (
            <Typography>{player.ready ? 'ready' : 'not ready'}</Typography>
          )}
        </>
      }
      {...props}
    />
  )
}
