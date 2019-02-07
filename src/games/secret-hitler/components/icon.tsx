import * as React from 'react'
import cx from 'classnames'

import alive from '../static/icon-alive.svg'
import card from '../static/icon-card.svg'
import chaos from '../static/icon-chaos.svg'
import check from '../static/icon-check.svg'
import fascist from '../static/icon-fascist.svg'
import inspect from '../static/icon-inspect.svg'
import kill from '../static/icon-kill.svg'
import liberal from '../static/icon-liberal.svg'
import menu from '../static/icon-menu.svg'
import { makeStyles } from '@material-ui/styles'

interface Props {
  className?: string
  padLeft?: boolean
  padRight?: boolean
  icon:
    | 'alive'
    | 'card'
    | 'chaos'
    | 'check'
    | 'fascist'
    | 'inspect'
    | 'kill'
    | 'liberal'
    | 'menu'
}

const useStyles = makeStyles({
  root: {
    width: '1em',
    height: '1em',
  },
  padLeft: {
    'margin-left': '0.5em',
  },
  padRight: {
    'margin-right': '0.5em',
  },
})

export const SHIcon: React.SFC<Props> = ({
  icon,
  className,
  padLeft,
  padRight,
  ...props
}) => {
  const classes = useStyles()

  function getIcon() {
    if (icon === 'alive') return alive
    if (icon === 'card') return card
    if (icon === 'check') return check
    if (icon === 'chaos') return chaos
    if (icon === 'fascist') return fascist
    if (icon === 'kill') return kill
    if (icon === 'liberal') return liberal
    if (icon === 'menu') return menu
    if (icon === 'inspect') return inspect
  }

  return (
    <img
      {...props}
      className={cx(className, classes.root, {
        [classes.padLeft]: padLeft,
        [classes.padRight]: padRight,
      })}
      src={getIcon()}
    />
  )
}
