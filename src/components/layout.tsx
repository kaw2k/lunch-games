import * as React from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'

interface Props {
  padded?: boolean
}

const useStyles = makeStyles({
  padded: {
    padding: '1em',
  },

  root: {
    minHeight: '100vh',
    display: 'flex',
    flexFlow: 'column',

    '& > * ': {
      marginBottom: '1em',
    },
    '& > :last-child': {
      marginBottom: 0,
    },
  },
})

export const Layout: React.SFC<Props> = ({ children, padded }) => {
  const classes = useStyles()
  return (
    <div className={cx(classes.root, { [classes.padded]: padded })}>
      {children}
    </div>
  )
}
