import * as React from 'react'
import { Game } from '../../interfaces/game'
import { getBoardEffect } from '../../helpers/game'
import { Card, Placeholder } from '../../components/card'
import { Grid } from '../../components/grid'

export const Board: React.SFC<{ game: Game }> = ({ game }) => {
  const fascists = game.playedCards.filter(c => c === 'fascist').length
  const liberals = game.playedCards.filter(c => c === 'liberal').length

  return (
    <div>
      <h3>Fascists:</h3>
      <Grid flow="horizontal" justify="between">
        {[1, 2, 3, 4, 5].map(i =>
          i <= fascists ? (
            <Card card="fascist" key={`fascist-card-${i}`} />
          ) : (
            <Placeholder
              key={`fascist-placeholder-${i}`}
              type={getBoardEffect(game.players.length, i)}
            />
          )
        )}
      </Grid>

      <h3>Liberals:</h3>
      <Grid flow="horizontal" justify="between">
        {[1, 2, 3, 4, 5].map(i =>
          i <= liberals ? (
            <Card key={`liberal-${i}`} card="liberal" />
          ) : (
            <Placeholder type={null} />
          )
        )}
      </Grid>

      <div>
        <strong>chaos:</strong> {game.chaos} (out of 3)
      </div>
    </div>
  )
}
