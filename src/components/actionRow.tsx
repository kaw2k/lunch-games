import * as React from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'

interface Props {
  fixed?: boolean
  className?: string
}

const useStyles = makeStyles({
  root: {
    display: 'flex',

    '& > *': {
      flex: '1 1 auto',
    },

    '& > * + * ': {
      marginLeft: '1em',
    },
  },

  fixed: {
    marginTop: 'auto',
  },
})

export const ActionRow: React.SFC<Props> = ({ children, className, fixed }) => {
  const classes = useStyles()
  return (
    <div className={cx(classes.root, className, { [classes.fixed]: fixed })}>
      {children}
    </div>
  )
}
