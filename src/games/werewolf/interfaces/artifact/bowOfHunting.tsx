import * as React from 'react'
import { Artifact } from '.'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { passArtifact, updateArtifact, artifactKill } from '../actions'
import { getArtifact } from './artifacts'
import { PromptView, ByArtifact } from '../prompt'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { player: playerId, artifact: artifactState },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)
  const hasBeenPassed = !!artifactState.state

  if (hasBeenPassed) {
    return (
      <ChoosePlayers
        title={artifact.title}
        description="You get to kill someone"
        players={values(game.players).filter(p => p.alive)}
        columns={2}
        doneText="kill with bow"
        onDone={([target]) => {
          done([artifactKill({ target })])
        }}
      />
    )
  }

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      removePlayer={game.players[playerId]}
      players={values(game.players).filter(p => p.alive)}
      columns={2}
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
            target,
          }),
        ])
      }}
    />
  )
}

export const BowOfHunting = Artifact({
  type: 'bow of hunting',
  title: 'Bow of Hunting',
  category: 'Killing',
  description:
    'Give this artifact to someone else, that person has three seconds to kill any one person.',
  infinite: false,
  ActivateView,
})
