import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Evidence, Weapon } from '../interfaces/game'
import { Selectable } from '../../../components/card/selectable'

const useStyles = makeStyles({
  root: {},
  image: { width: '100%' },
})

export const Card: React.SFC<{
  className?: string
  onClick?: (item: Evidence | Weapon) => void
  item: Evidence | Weapon
  selected?: boolean
}> = ({ item, className, onClick, selected }) => {
  const classes = useStyles()

  return (
    <Selectable
      onClick={onClick && (() => onClick && onClick(item))}
      selected={selected}
      selectedBackgroundColor="white">
      <img src={item.img} className={classes.image} />
    </Selectable>
  )
}
