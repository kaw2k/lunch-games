import * as React from 'react'
import { ChoosePlayers } from '../../../components/choosePlayers'
import { AvalonGameContext } from '../../../helpers/contexts'

interface Props {}

export const LadyOfTheLake: React.SFC<Props> = ({}) => {
  const { player, game, updateGame, updateGamePlayer } = React.useContext(
    AvalonGameContext
  )

  return (
    <ChoosePlayers
      title="Choose who you want to inspect, they will get lady of the lake after you"
      removePlayer={player}
      players={game.players}
      doneButton="inspect"
      done={async ([selectedPlayerId]) => {
        const selectedPlayer = game.players[selectedPlayerId]
        updateGamePlayer({ ...player, ladyOfTheLake: false })
        updateGame({ nextLadyOfTheLake: selectedPlayer.id })
        alert(
          `${selectedPlayer.name || selectedPlayer.id} is ${
            selectedPlayer.party
          }`
        )
      }}
    />
  )
}
