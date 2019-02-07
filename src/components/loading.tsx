import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
})

export const Loading = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}
