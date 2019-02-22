import * as React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Roles, getCard } from '../../interfaces/card'

interface Props {
  role: Roles
}

const useStyles = makeStyles({
  img: {
    width: '100%',
  },
  ul: {
    listStyle: 'disc',
    margin: 0,
    padding: 0,
  },
  hint: {
    fontWeight: 'bold',
  },
  root: {
    marginBottom: '1em',
  },
})

export const ViewRole: React.SFC<Props> = ({ role }) => {
  const classes = useStyles()
  const card = getCard(role)

  return (
    <Grid className={classes.root} container spacing={16}>
      <Grid item xs={3}>
        <img src={card.image} className={classes.img} />
      </Grid>

      <Grid item xs={9}>
        <Typography gutterBottom variant="h1">
          {card.role}
        </Typography>
        <Typography gutterBottom>{card.description}</Typography>
        <Typography className={classes.hint} component="strong" gutterBottom>
          Hints:
        </Typography>
        <ul className={classes.ul}>
          {card.hints.map((hint, i) => (
            <Typography key={i} component="li" gutterBottom>
              {hint}
            </Typography>
          ))}
        </ul>
      </Grid>
    </Grid>
  )
}
