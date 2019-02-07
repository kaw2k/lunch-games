import * as React from 'react'
import { Board } from '../../components/board'
import { Button } from '../../../../components/button'
import { SecretHitlerGameContext } from '../../../../helpers/contexts'

interface Props {
  myTurn: () => void
}

export const ScoreScreen: React.SFC<Props> = ({ myTurn }) => {
  const { game, endGame } = React.useContext(SecretHitlerGameContext)

  return (
    <div>
      <Board game={game} />

      <Button onClick={() => endGame()}>end game</Button>
      <Button
        disabled={!!game.government || !!game.performPower}
        onClick={myTurn}>
        my turn
      </Button>
    </div>
  )
}
