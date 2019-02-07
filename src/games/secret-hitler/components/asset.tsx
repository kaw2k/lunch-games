import * as React from 'react'
import cx from 'classnames'

import cardFail from '../static/card-fail.svg'
import cardSuccess from '../static/card-success.svg'
import cardFascist from '../static/card-fascist.svg'
import cardLiberal from '../static/card-liberal.svg'
import cardHitler from '../static/card-hitler.svg'
import logoFascist from '../static/logo-fascist.svg'
import logoLiberal from '../static/logo-liberal.svg'
import { makeStyles } from '@material-ui/styles'

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

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})

export const Asset: React.SFC<Props> = ({ asset, ...props }) => {
  const classes = useStyles()

  function getAsset() {
    if (asset === 'logoLiberal') return logoLiberal
    if (asset === 'logoFascist') return logoFascist
    if (asset === 'cardHitler') return cardHitler
    if (asset === 'cardLiberal') return cardLiberal
    if (asset === 'cardFascist') return cardFascist
    if (asset === 'cardSuccess') return cardSuccess
    if (asset === 'cardFail') return cardFail
  }

  return (
    <img
      {...props}
      className={cx(classes.root, props.className)}
      src={getAsset()}
    />
  )
}
