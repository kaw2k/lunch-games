import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Evidence, Weapon } from '../interfaces/game'

const useStyles = makeStyles({
  root: {},
  img: {
    width: '100%',
  },
})

export const Card: React.SFC<{
  item: Evidence | Weapon
}> = ({ item }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <img className={classes.img} src={item.img} />
    </div>
  )
}
