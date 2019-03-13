import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Actions } from '../../interfaces/actions'
import { firebaseArrayAdd } from '../../../../helpers/firebase'
import { SetupRoleContainer } from '../../components/setupRole/setupRoleContainer'
import { getCard } from '../../interfaces/card/cards'
import { ChoosePlayers } from '../../../../components/choosePlayers'

interface Props {}

export const WerewolfPlayerSetup: React.SFC<Props> = ({}) => {
  const { game, player, updateGame, updateGamePlayer } = React.useContext(
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

  if (!player.leftNeighbor) {
    return (
      <ChoosePlayers
        title="Before you see your role..."
        description="Who is the player on your left?"
        removePlayer={player}
        players={game.players}
        doneText="they are on my left"
        onDone={([target]) => {
          updateGamePlayer({
            ...player,
            leftNeighbor: target,
          })
        }}
      />
    )
  }

  return (
    <>
      <SetupRoleContainer player={player}>
        <SetupView ready={ready} />
      </SetupRoleContainer>
    </>
  )
}
