import * as React from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'
import { Selectable } from '../../../components/card/selectable'
import { SkullCard } from '../interfaces/game'

const useStyles = makeStyles({
  root: {
    fontSize: '5em',
    textAlign: 'center',
    borderRadius: '5px',
    overflow: 'hidden',
  },
})

export const Card: React.SFC<{
  className?: string
  onClick?: (card: SkullCard) => void
  card: SkullCard
  selected?: boolean
}> = ({ className, card, onClick, selected }) => {
  const classes = useStyles()

  return (
    <Selectable
      onClick={onClick && (() => onClick && onClick(card))}
      selected={selected}
      className={cx(className, classes.root)}>
      {card.type === 'flower' ? '🌸' : '💀'}
    </Selectable>
  )
}
