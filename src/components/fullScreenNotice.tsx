import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { colors, Typography } from '@material-ui/core'

interface Props {}

const useStyles = makeStyles({
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
  },
})

export const FullScreenNotice: React.SFC<Props> = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.done}>
      <Typography align="center" variant="h2" color="inherit">
        {children}
      </Typography>
    </div>
  )
}
