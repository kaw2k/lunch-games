import { Artifact } from '.'
import React, { useState } from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { values } from 'ramda'
import { PlayerId } from '../../../../interfaces/player'
import { Typography } from '@material-ui/core'
import { destroyArtifact } from '../actions'
import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'
import { ArtifactView } from '../../components/artifact/artifactView'
import { playerName } from '../../../../components/playerName';

const ActivateView: PromptView<ByArtifact> = ({ done }) => {
  const { game } = React.useContext(WerewolfGameContext)
  const [pid, setPid] = useState<PlayerId | null>(null)
  const artifact = getArtifact(OnyxOfDestruction.type)

  if (pid) {
    const target = game.players[pid]
    return (
      <>
        <Typography gutterBottom variant="h2">
          {playerName(target)}'s artifacts
        </Typography>

        {target.artifacts
          .filter(a => a.activated !== 'played' && a.activated !== 'playing')
          .map(a => (
            <ArtifactView
              player={game.players[pid]}
              artifactState={a}
              action={{
                text: 'destroy',
                callback: () => {
                  done([
                    destroyArtifact({ target: target.id, artifact: a.type }),
                  ])
                },
              }}
            />
          ))}
      </>
    )
  }

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(
        p =>
          p.artifacts.filter(
            a => a.activated !== 'played' && a.activated !== 'playing'
          ).length
      )}
      columns={2}
      doneText="select player"
      onDone={([target]) => setPid(target)}
    />
  )
}

export const OnyxOfDestruction = Artifact({
  type: ArtifactType('onyx of destruction'),
  title: 'Onyx of Destruction',
  category: 'Target Other Artifacts',
  description:
    'Choose a player with an unrevealed artifact card and remove it from the game.',
  infinite: false,
  ActivateView,
})
