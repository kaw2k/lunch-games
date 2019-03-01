import * as React from 'react'
import cx from 'classnames'
import { PlayerWerewolf } from '../interfaces/player'
import { Profile, Props as ProfileProps } from '../../../components/profile'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

interface Props extends Partial<ProfileProps> {
  player: PlayerWerewolf
  showReady?: boolean
  showRole?: boolean
  showLiving?: boolean
}

const useStyles = makeStyles({
  dim: {
    opacity: 0.25,
  },
})

export const WerewolfProfile: React.SFC<Props> = ({
  player,
  showRole,
  showReady,
  showLiving,
  ...props
}) => {
  const classes = useStyles()
  return (
    <Profile
      image={player.profileImg}
      text={player.name || player.id}
      className={cx({
        [classes.dim]: showLiving && !player.alive,
      })}
      subtext={
        <>
          {showRole && (
            <Typography>
              {player.role}
              {player.secondaryRole && ` / ${player.secondaryRole}`}
            </Typography>
          )}
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
