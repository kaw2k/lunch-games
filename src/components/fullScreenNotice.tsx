import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { colors, Typography } from '@material-ui/core'
import { Button } from './button'

interface Props {
  clickHandler?: () => void
}

const useStyles = makeStyles({
  button: {
    width: '100%',
    height: '100%',
  },
  done: {
    position: 'fixed',
    top: '1em',
    bottom: '1em',
    right: '1em',
    left: '1em',
    background: colors.green[400],
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    margin: 0,
    zIndex: 10,
  },
})

export const FullScreenNotice: React.SFC<Props> = ({ children, clickHandler}) => {
  const classes = useStyles()

  return (
    <div className={classes.done}>
      {clickHandler ? (
        <Button onClick={clickHandler} className={classes.button} color="green">
          {children}
        </Button>
      ) : (
        <Typography align="center" variant="h2" color="inherit">
          {children}
        </Typography>
      )}
    </div>
  )
}
