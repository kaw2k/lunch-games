import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

interface Props {}

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
    gridGap: '1em',
  },
})

export const Grid: React.SFC<Props> = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}
