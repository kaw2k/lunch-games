import * as React from 'react'
import { Colors, getColor } from '../../../helpers/colors'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    height: '6em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '3px',
  },
  title: {},

  fails: {
    position: 'absolute',
    top: '-1.5em',
  },
})

export const Card: React.SFC<{
  players: number
  fails: number
  background?: Colors | null
}> = ({ players, fails, background }) => {
  const classes = useStyles()
  return (
    <div className={classes.root} style={{ background: getColor(background) }}>
      {!background && (
        <React.Fragment>
          <Typography variant="h2" className={classes.title}>
            {players}
          </Typography>
          {fails === 2 && (
            <Typography component="em" className="fails">
              fails 2
            </Typography>
          )}
        </React.Fragment>
      )}
    </div>
  )
}
