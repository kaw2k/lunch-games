import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getCard } from '../../data/roles'
import { Actions } from '../../interfaces/actions'
import { firebaseArrayAdd } from '../../../../helpers/firebase'

interface Props {}

export const WerewolfPlayerSetup: React.SFC<Props> = ({}) => {
  const { player, updateGame, updateGamePlayer } = React.useContext(
    WerewolfGameContext
  )
  const { SetupView } = getCard(player.role)

  async function ready(actions: Actions[]) {
    updateGamePlayer({
      ...player,
      ready: true,
    })
    updateGame({
      actions: firebaseArrayAdd(...actions),
    })
  }

  return (
    <>
      <SetupView ready={ready} />
    </>
  )
}
