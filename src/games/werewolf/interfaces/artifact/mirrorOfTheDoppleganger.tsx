import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { updatePlayer } from '../actions'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { values } from 'ramda'
import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { player: playerId, artifact: artifactState },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)
  const player = game.players[playerId]

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      removePlayer={player}
      players={values(game.players).filter(p => p.alive)}
      columns={2}
      doneText="copy player"
      onDone={([target]) => {
        done([
          updatePlayer({
            target: player.id,
            updates: {
              secondaryRole: game.players[target].role,
            },
          }),
        ])
      }}
    />
  )
}

export const MirrorOfTheDoppleganger = Artifact({
  type: ArtifactType('mirror of the doppleganger'),
  title: 'Mirror of the Doppleganger',
  category: 'Imitate Role',
  description:
    'Choose a player and secretly view their role. You now have that players special power in addition to yours.',
  infinite: true,
  ActivateView,
})
