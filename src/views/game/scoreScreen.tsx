import * as React from 'react'
import { Button } from '../../components/button'
import { Board } from './board'
import { GameContext } from '../../helpers/contexts'

interface Props {
  myTurn: () => void
}

export const ScoreScreen: React.SFC<Props> = ({ myTurn }) => {
  const { game, endGame } = React.useContext(GameContext)

  return (
    <div>
      <Board game={game} />

      <Button onClick={endGame}>end game</Button>
      <Button
        disabled={!!game.government || !!game.performPower}
        onClick={myTurn}>
        my turn
      </Button>
    </div>
  )
}
