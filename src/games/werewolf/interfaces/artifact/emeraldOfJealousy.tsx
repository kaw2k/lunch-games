import { Artifact } from '.'
import React, { useState } from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { values } from 'ramda'
import { PlayerId } from '../../../../interfaces/player'
import { Typography } from '@material-ui/core'
import { passArtifact } from '../actions'
import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'
import { ArtifactView } from '../../components/artifact/artifactView'
import { playerName } from '../../../../components/playerName'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { player: playerId },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const [pid, setPid] = useState<PlayerId | null>(null)
  const artifact = getArtifact(EmeraldOfJealousy.type)

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
                text: 'take',
                callback: () => {
                  done([
                    passArtifact({
                      target: playerId,
                      artifact: a.type,
                      source: target.id,
                    }),
                  ])
                },
              }}
            />
          ))}
      </>
    )
  }

  return (
    <ChooseWerewolfPlayer
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(
        p =>
          p.artifacts.filter(
            a => a.activated !== 'played' && a.activated !== 'playing'
          ).length
      )}
      doneText="select player"
      onDone={([target]) => setPid(target.id)}
    />
  )
}

export const EmeraldOfJealousy = Artifact({
  type: ArtifactType('emerald of jealousy'),
  title: 'emerald of jealousy',
  category: 'Target Other Artifacts',
  description:
    'Choose a player with an unrevealed artifact card. Take that card from them, it is yours now.',
  infinite: false,
  ActivateView,
})
