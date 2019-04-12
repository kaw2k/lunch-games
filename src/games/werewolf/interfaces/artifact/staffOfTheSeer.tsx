import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { getArtifact } from './artifacts'
import { PromptView, ByArtifact } from '../prompt'
import { playerName } from '../../../../components/playerName'
import { ArtifactType } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { player: playerId, artifact: artifactState },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  return (
    <ChooseWerewolfPlayer
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive && p.id !== playerId)}
      doneText="view role"
      onDone={([target]) => {
        const targetPlayer = game.players[target.id]
        alert(`${playerName(targetPlayer)} is the ${targetPlayer.role}`)
        done([])
      }}
    />
  )
}

export const StaffOfTheSeer = Artifact({
  type: ArtifactType('staff of the seer'),
  title: 'Staff of the Seer',
  category: 'Inspection',
  description: 'Choose a player and secretly view their role.',
  infinite: false,
  ActivateView,
})
