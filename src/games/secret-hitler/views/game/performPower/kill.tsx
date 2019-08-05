import * as React from 'react'
import { SecretHitlerGameContext } from '../../../../../helpers/contexts'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { values } from 'ramda'
import { playerName } from '../../../../../components/playerName'

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
      doneText="kill"
      players={values(game.players).filter(p => p.living)}
      onDone={async ([targetPlayer]) => {
        const p = game.players[targetPlayer.id]
        if (p.role.isHitler) {
          endGame(
            'liberal',
            `${playerName(p)} was killed and is hitler, liberals win!`
          )
        } else {
          updateGamePlayer({ ...p, living: false })
          updateGame({
            performPower: null,
            message: `${playerName(player)} killed ${playerName(p)}`,
          })
        }
      }}
    />
  )
}
