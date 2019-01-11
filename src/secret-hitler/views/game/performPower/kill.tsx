import * as React from 'react'
import { ChoosePlayer } from './choosePlayer'
import { SecretHitlerGameContext } from '../../../../helpers/contexts'

export const Kill: React.SFC<{}> = () => {
  const { endGame, updateGame, updateGamePlayer } = React.useContext(
    SecretHitlerGameContext
  )

  return (
    <ChoosePlayer
      title="Who do you want to kill?"
      doneText="kill"
      done={async p => {
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
