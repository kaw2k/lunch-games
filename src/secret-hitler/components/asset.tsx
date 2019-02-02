import * as React from 'react'

import cardFail from '../static/card-fail.svg'
import cardSuccess from '../static/card-success.svg'
import cardFascist from '../static/card-fascist.svg'
import cardLiberal from '../static/card-liberal.svg'
import cardHitler from '../static/card-hitler.svg'
import logoFascist from '../static/logo-fascist.svg'
import logoLiberal from '../static/logo-liberal.svg'

interface Props {
  className?: string
  asset:
    | 'logoLiberal'
    | 'logoFascist'
    | 'cardHitler'
    | 'cardLiberal'
    | 'cardFascist'
    | 'cardSuccess'
    | 'cardFail'
}

export const Asset: React.SFC<Props> = ({ asset, ...props }) => {
  function getAsset() {
    if (asset === 'logoLiberal') return logoLiberal
    if (asset === 'logoFascist') return logoFascist
    if (asset === 'cardHitler') return cardHitler
    if (asset === 'cardLiberal') return cardLiberal
    if (asset === 'cardFascist') return cardFascist
    if (asset === 'cardSuccess') return cardSuccess
    if (asset === 'cardFail') return cardFail
  }

  return <img {...props} src={getAsset()} />
}
