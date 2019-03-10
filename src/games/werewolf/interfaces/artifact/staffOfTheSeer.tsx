import * as React from 'react'
import { Artifact } from '.'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { getArtifact } from './artifacts'
import { PromptView, ByArtifact } from '../prompt'
import { playerName } from '../../../../components/playerName'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { player: playerId, artifact: artifactState },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      removePlayer={game.players[playerId]}
      players={values(game.players).filter(p => p.alive)}
      columns={2}
      doneText="view role"
      onDone={([target]) => {
        const targetPlayer = game.players[target]
        alert(`${playerName(targetPlayer)} is the ${targetPlayer.role}`)
        done([])
      }}
    />
  )
}

export const StaffOfTheSeer = Artifact({
  type: 'staff of the seer',
  title: 'Staff of the Seer',
  category: 'Inspection',
  description: 'Choose a player and secretly view their role.',
  infinite: false,
  ActivateView,
})
