import { Artifact, ArtifactState } from '.'
import React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { values } from 'ramda'
import { PlayerId } from '../../../../interfaces/player'
import { Typography, Button } from '@material-ui/core'
import { destroyArtifact } from '../actions'
import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'
import { ArtifactView } from '../../components/artifact/artifactView'
import { ActionRow } from '../../../../components/actionRow'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { player: playerId },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(DiamondOfDenial.type)
  const artifacts = values(game.players)
    .filter(p => p.alive)
    .reduce<{ owner: PlayerId; artifactState: ArtifactState }[]>(
      (artifacts, p) => {
        return artifacts.concat(
          p.artifacts
            .filter(
              a => a.activated === 'played' && getArtifact(a.type).infinite
            )
            .map(a => ({ owner: p.id, artifactState: a }))
        )
      },
      []
    )

  return (
    <>
      <Typography gutterBottom variant="h2">
        {artifact.title}
      </Typography>
      <Typography gutterBottom component="em">
        {artifact.description}
      </Typography>

      {artifacts.map(({ artifactState, owner }) => (
        <ArtifactView
          player={game.players[owner]}
          artifactState={artifactState}
          action={{
            text: 'destroy',
            callback: () => {
              done([
                destroyArtifact({
                  target: owner,
                  artifact: artifactState.type,
                }),
              ])
            },
          }}
        />
      ))}

      <ActionRow fixed>
        <Button onClick={() => done([])}>no one I guess</Button>
      </ActionRow>
    </>
  )
}

export const DiamondOfDenial = Artifact({
  type: ArtifactType('diamond of denial'),
  title: 'Diamond of Denial',
  category: 'Target Other Artifacts',
  description:
    'Choose a player with a revealed infinite artifact and take that card from them returning it to the deck.',
  infinite: false,
  ActivateView,
})
