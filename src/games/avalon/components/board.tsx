import * as React from 'react'
import { AvalonGame } from '../interfaces/game'
import { Card } from './card'
import { ActionRow } from '../../../components/actionRow'
import { count } from '../../../helpers/count'
import { getBoardEffect } from '../helpers/getBoardEffect'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  row: {
    display: 'flex',
    justifyContent: 'space-around',
  },

  rowItem: {
    textAlign: 'center',
  },
})

const Row: React.SFC<{}> = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.row}>{children}</div>
}

const Info: React.SFC<{ title: string }> = ({ title, children }) => {
  const classes = useStyles()
  return (
    <div className={classes.rowItem}>
      <Typography variant="h3">{title}</Typography>
      <Typography>{children}</Typography>
    </div>
  )
}

export const Board: React.SFC<{ game: AvalonGame }> = ({ game }) => {
  const numGood = count(game.players, p => p.party === 'good')
  const numBad = count(game.players, p => p.party === 'bad')

  const effects = [0, 1, 2, 3, 4].map(i => getBoardEffect(game.players, i))

  return (
    <>
      <div>
        <ActionRow>
          {effects.map(({ fail, people }, i) => (
            <Card
              key={i}
              fails={fail}
              players={people}
              background={
                !game.missionResults[i]
                  ? null
                  : game.missionResults[i] === 'bad'
                  ? 'red'
                  : 'blue'
              }
            />
          ))}
        </ActionRow>
      </div>

      <Row>
        <Info title="Chaos">{game.chaos} of 5</Info>
        <Info title="Good">{numGood}</Info>
        <Info title="Bad">{numBad}</Info>
      </Row>
    </>
  )
}
