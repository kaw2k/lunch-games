import * as React from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'
import { BottomNavigation } from '@material-ui/core'
import { BottomNavigationProps } from '@material-ui/core/BottomNavigation'

interface Props extends BottomNavigationProps {}

const useStyles = makeStyles({
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
  },
})

export const Tabs: React.SFC<Props> = props => {
  const classes = useStyles()
  return (
    <BottomNavigation
      {...props}
      className={cx(classes.nav, props.className || '')}
    />
  )
}
