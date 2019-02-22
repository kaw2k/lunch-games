import * as React from 'react'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { AvalonGameContext } from '../../../../helpers/contexts'
import values from 'ramda/es/values'

export const KillMerlin: React.SFC<{}> = ({}) => {
  const { game, endGame } = React.useContext(AvalonGameContext)

  return (
    <ChoosePlayers
      title="You have one chance for redemption, if you kill merlin you win."
      players={values(game.players).filter(p => p.party === 'good')}
      doneText="kill"
      onDone={async ([selectedPlayerId]) => {
        const killedPlayer = game.players[selectedPlayerId]
        const merlin = values(game.players).find(p => p.role === 'merlin')

        if (killedPlayer.role === 'merlin') {
          endGame('bad', 'Bad guys killed merlin, they win!')
        } else {
          endGame(
            'good',
            `The good team won and Merlin ${
              merlin ? `(${merlin.name || merlin.id})` : ''
            } lived!`
          )
        }
      }}
    />
  )
}
