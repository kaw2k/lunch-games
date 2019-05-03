import * as React from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'

interface Props {
  className?: string
  padded?: boolean
  hasTabs?: boolean
}

const useStyles = makeStyles({
  padded: {
    padding: '1em',
  },

  hasTabs: {
    marginBottom: '56px',
  },

  root: {
    minHeight: '100vh',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',

    '& > * ': {
      marginBottom: '1em',
    },
    '& > :last-child': {
      marginBottom: 0,
    },
  },
})

export const Layout: React.SFC<Props> = ({
  children,
  padded,
  className,
  hasTabs,
}) => {
  const classes = useStyles()
  return (
    <div
      className={cx(classes.root, className, {
        [classes.padded]: padded,
        [classes.hasTabs]: hasTabs,
      })}>
      {children}
    </div>
  )
}
