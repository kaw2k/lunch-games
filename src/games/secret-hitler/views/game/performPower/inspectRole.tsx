import * as React from 'react'
import { SecretHitlerGameContext } from '../../../../../helpers/contexts'
import { ChoosePlayers } from '../../../../../components/choosePlayers'

export const InspectRole: React.SFC<{}> = () => {
  const { updateGame, game } = React.useContext(SecretHitlerGameContext)

  return (
    <ChoosePlayers
      title="Who would you like to inspect?"
      doneText="inspect"
      players={game.players}
      onDone={([player]) => {
        alert(game.players[player.id].role.party)
        updateGame({ performPower: null })
      }}
    />
  )
}
