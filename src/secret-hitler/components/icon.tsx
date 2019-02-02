import * as React from 'react'

import alive from '../static/icon-alive.svg'
import card from '../static/icon-card.svg'
import chaos from '../static/icon-chaos.svg'
import check from '../static/icon-check.svg'
import fascist from '../static/icon-fascist.svg'
import inspect from '../static/icon-inspect.svg'
import kill from '../static/icon-kill.svg'
import liberal from '../static/icon-liberal.svg'
import menu from '../static/icon-menu.svg'

interface Props {
  className?: string
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

export const Icon: React.SFC<Props> = ({ icon, ...props }) => {
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
      src={getIcon()}
      style={{ width: '1.5em', height: '1.5em' }}
    />
  )
}
