import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact, Artifacts, ArtifactState } from './artifacts'
import { PromptView, ByArtifact } from '../prompt'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Typography } from '@material-ui/core'
import { values } from 'ramda'
import contains from 'ramda/es/contains'
import { shuffle } from '../../../../helpers/shuffle'
import { giveArtifact, updateArtifact } from '../actions'
import { Id } from '../../../../helpers/id'
import { ArtifactType } from '../../../../helpers/id'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { player: playerId, artifact: artifactState },
}) => {
  const { game } = React.useContext(WerewolfGameContext)

  const usedArtifacts = values(game.players).reduce<Artifacts[]>((memo, p) => {
    return memo.concat(p.artifacts.map(a => a.type))
  }, [])
  const nextArtifactType = shuffle(
    Artifacts.map(a => a.type).filter(a => !contains(a, usedArtifacts))
  )[0]

  const nextArtifact = getArtifact(nextArtifactType)
  const nextArtifactState = ArtifactState(nextArtifactType, {
    activated: 'playing',
  })

  // We got an artifact with an active view
  const NextActiveView = nextArtifact.ActivateView
  if (NextActiveView) {
    return (
      <NextActiveView
        done={actions => {
          done([
            giveArtifact({ target: playerId, artifact: nextArtifactState }),
            ...actions,
            updateArtifact({
              target: playerId,
              artifact: nextArtifactType,
              updates: {
                activated: 'played',
              },
            }),
          ])
        }}
        prompt={{
          id: Id(),
          player: playerId,
          type: 'by artifact',
          artifact: {
            ...ArtifactState(nextArtifactType),
            activated: 'playing',
          },
        }}
      />
    )
  }

  // We got an artifact that doesn't have an active view
  // Set it to played and inform the user
  return (
    <>
      <Typography gutterBottom variant="h2">
        {nextArtifact.title}
      </Typography>
      <Typography gutterBottom>{nextArtifact.description}</Typography>

      <ActionRow fixed>
        <Button
          color="green"
          onClick={() => {
            done([
              giveArtifact({
                target: playerId,
                artifact: ArtifactState(nextArtifactType, {
                  activated: 'played',
                }),
              }),
            ])
          }}>
          done
        </Button>
      </ActionRow>
    </>
  )
}

export const CitrineOfFortune = Artifact({
  type: ArtifactType('citrine of fortune'),
  title: 'Citrine of Fortune',
  category: 'Chaos',
  description:
    'Exchange this Artifact for a new one which must be revealed instantly.',
  infinite: false,
  ActivateView,
})
