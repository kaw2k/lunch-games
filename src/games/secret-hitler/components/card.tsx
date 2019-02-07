import * as React from 'react'
import cx from 'classnames'
import { BoardEffects, Party } from '../interfaces/game'
import { SHIcon } from './icon'
import { Asset } from './asset'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '3em',
    height: '3em',
  },
  asset: {
    width: '100%',
    opacity: 0.1,
  },
  played: {
    opacity: 1,
  },
})

export const Card: React.SFC<{
  type?: BoardEffects | null
  party: Party
  played?: boolean
  className?: string
}> = ({ type, party, played, className }) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.root, className)}>
      {type === 'choose president' && (
        <SHIcon className={classes.icon} icon="check" />
      )}
      {type === 'kill' && <SHIcon className={classes.icon} icon="kill" />}
      {type === 'inspect role' && (
        <SHIcon className={classes.icon} icon="inspect" />
      )}
      {type === 'inspect cards' && (
        <SHIcon className={classes.icon} icon="inspect" />
      )}

      <Asset
        className={cx(classes.asset, { [classes.played]: played })}
        asset={party === 'fascist' ? 'cardFail' : 'cardSuccess'}
      />
    </div>
  )
}
