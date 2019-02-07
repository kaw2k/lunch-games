import * as React from 'react'
import { SecretHitlerGameContext } from '../../../../../helpers/contexts'
import { ChoosePlayers } from '../../../../../components/choosePlayers'

export const InspectRole: React.SFC<{}> = () => {
  const { updateGame, game, player } = React.useContext(SecretHitlerGameContext)

  return (
    <ChoosePlayers
      title="Who would you like to inspect?"
      doneButton="inspect"
      players={game.players}
      removePlayer={player}
      done={([pid]) => {
        alert(game.players[pid].role.party)
        updateGame({ performPower: null })
      }}
    />
  )
}
