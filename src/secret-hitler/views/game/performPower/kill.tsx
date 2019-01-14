import * as React from 'react'
import { SecretHitlerGameContext } from '../../../../helpers/contexts'
import { ChoosePlayers } from '../../../../components/choosePlayers'

export const Kill: React.SFC<{}> = () => {
  const {
    endGame,
    updateGame,
    updateGamePlayer,
    game,
    player,
  } = React.useContext(SecretHitlerGameContext)

  return (
    <ChoosePlayers
      title="Who do you want to kill?"
      doneButton="kill"
      players={game.players}
      removePlayer={player}
      done={async ([pid]) => {
        const p = game.players[pid]
        if (p.role.isHitler) {
          endGame(
            'liberal',
            `${p.name} was killed and is hitler, liberals win!`
          )
        } else {
          updateGamePlayer({ ...p, living: false })
          updateGame({ performPower: null })
        }
      }}
    />
  )
}
