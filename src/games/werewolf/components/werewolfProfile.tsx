import * as React from 'react'
import cx from 'classnames'
import { PlayerWerewolf } from '../interfaces/player'
import { Profile, Props as ProfileProps } from '../../../components/profile'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { getCard, isRole } from '../interfaces/card/cards'
import { WerewolfGameContext } from '../../../helpers/contexts'
import { Sasquatch } from '../interfaces/card/sasquatch'

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
  const { game } = React.useContext(WerewolfGameContext)
  const classes = useStyles()
  return (
    <Profile
      image={
        showRole || (!game.options.noFlip && !player.alive)
          ? getCard(player.role).profile
          : player.profileImg
      }
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
              {isRole(player, Sasquatch.role) &&
                (player.sasquatchWakesUp ? ` (werewolf)` : ` (villager)`)}
            </Typography>
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
