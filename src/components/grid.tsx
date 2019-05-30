import * as React from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'

interface Props {
  className?: string
}

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
    gridGap: '1em',
  },
})

export const Grid: React.SFC<Props> = ({ children, className = '' }) => {
  const classes = useStyles()
  return <div className={cx(classes.root, className)}>{children}</div>
}
