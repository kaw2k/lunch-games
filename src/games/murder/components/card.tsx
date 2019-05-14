import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Evidence, Weapon } from '../interfaces/game'
import { Selectable } from '../../../components/card/selectable'

const useStyles = makeStyles({
  root: {},
  image: {
    height: '100%',
  },
})

export const Card: React.SFC<{
  onClick?: (item: Evidence | Weapon) => void
  item: Evidence | Weapon
}> = ({ item, onClick }) => {
  const classes = useStyles()

  return (
    <Selectable
      onClick={() => onClick && onClick(item)}
      image={item.img}
      classes={{
        root: classes.root,
        image: classes.image,
      }}
    />
  )
}
