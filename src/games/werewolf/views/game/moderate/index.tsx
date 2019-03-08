import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { NightModerator } from './night'
import { DayModerator } from './day'
import { Snackbar, IconButton, Icon, colors } from '@material-ui/core'
import { DawnModerator } from './dawn'
import { makeStyles } from '@material-ui/styles'

interface Props {}

const useStyles = makeStyles({
  killed: {
    color: colors.orange[500],
  },
})

export const WerewolfModeratorGame: React.SFC<Props> = () => {
  const { game, updateGame, endGame } = React.useContext(WerewolfGameContext)
  const classes = useStyles()

  React.useEffect(() => {
    // Only end the game when it is day
    if (game.victory && game.time === 'day') {
      endGame(game.victory.team, game.victory.message)
    }
  })

  function clearPlayersKilled() {
    updateGame({
      playersKilled: [],
    })
  }

  return (
    <>
      {game.time === 'night' && <NightModerator />}
      {game.time === 'dawn' && <DawnModerator />}
      {game.time === 'day' && <DayModerator />}

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!game.playersKilled.length}
        autoHideDuration={10 * 1000}
        onClose={(e, r) => r !== 'clickaway' && clearPlayersKilled()}
        message={
          <span>
            <span className={classes.killed}>Players Killed:</span>{' '}
            {game.playersKilled.join(', ')}
          </span>
        }
        action={[
          <IconButton color="inherit" onClick={clearPlayersKilled}>
            <Icon>close</Icon>
          </IconButton>,
        ]}
      />
    </>
  )
}
