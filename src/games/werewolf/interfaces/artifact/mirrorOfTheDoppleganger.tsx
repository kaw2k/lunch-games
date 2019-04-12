import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { updatePlayer } from '../actions'
import { values } from 'ramda'
import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { player: playerId, artifact: artifactState },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)
  const player = game.players[playerId]

  return (
    <ChooseWerewolfPlayer
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive && p.id !== player.id)}
      doneText="copy player"
      onDone={([target]) => {
        done([
          updatePlayer({
            target: player.id,
            updates: {
              secondaryRole: game.players[target.id].role,
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
