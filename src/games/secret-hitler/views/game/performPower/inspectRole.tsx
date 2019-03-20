import * as React from 'react'
import { SecretHitlerGameContext } from '../../../../../helpers/contexts'
import { ChoosePlayers } from '../../../../../components/choosePlayers'

export const InspectRole: React.SFC<{}> = () => {
  const { updateGame, game } = React.useContext(SecretHitlerGameContext)

  return (
    <ChoosePlayers
      title="Who would you like to inspect?"
      columns={2}
      doneText="inspect"
      players={game.players}
      removePlayer
      onDone={([pid]) => {
        alert(game.players[pid].role.party)
        updateGame({ performPower: null })
      }}
    />
  )
}
