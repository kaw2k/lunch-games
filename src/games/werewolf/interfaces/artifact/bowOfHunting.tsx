import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import {
  passArtifact,
  updateArtifact,
  artifactKill,
  showPrompts,
} from '../actions'
import { getArtifact } from './artifacts'
import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { player: playerId, artifact: artifactState },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)
  const hasBeenPassed = !!artifactState.state

  if (hasBeenPassed) {
    return (
      <ChooseWerewolfPlayer
        title={artifact.title}
        description="You get to kill someone"
        players={values(game.players).filter(p => p.alive)}
        doneText="kill with bow"
        onDone={([target]) => {
          done([artifactKill({ target: target.id }), showPrompts({})])
        }}
      />
    )
  }

  return (
    <ChooseWerewolfPlayer
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive && p.id !== playerId)}
      doneText="Give Bow"
      onDone={([target]) => {
        done([
          updateArtifact({
            artifact: artifactState.type,
            target: playerId,
            updates: {
              activated: 'playing',
              state: true,
            },
          }),
          passArtifact({
            artifact: artifactState.type,
            source: playerId,
            target: target.id,
          }),
        ])
      }}
    />
  )
}

export const BowOfHunting = Artifact({
  type: ArtifactType('bow of hunting'),
  title: 'Bow of Hunting',
  category: 'Killing',
  description:
    'Give this artifact to someone else, that person has three seconds to kill any one person.',
  infinite: false,
  ActivateView,
})
