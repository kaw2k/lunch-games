import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Actions } from '../../interfaces/actions'
import { firebaseArrayAdd } from '../../../../helpers/firebase'
import { SetupRoleContainer } from '../../components/setupRole/setupRoleContainer'
import { getCard } from '../../interfaces/card/cards'

interface Props {}

export const WerewolfPlayerSetup: React.SFC<Props> = ({}) => {
  const { player, updateGame, updateGamePlayer } = React.useContext(
    WerewolfGameContext
  )
  const { SetupRoleView: SetupView } = getCard(player.role)

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
      <SetupRoleContainer player={player}>
        <SetupView ready={ready} />
      </SetupRoleContainer>
    </>
  )
}
