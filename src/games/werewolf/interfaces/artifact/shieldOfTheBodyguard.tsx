import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { getArtifact } from './artifacts'
import { updateArtifact, guard, addDelayedAction } from '../actions'
import { PlayerId } from '../../../../interfaces/player'
import { values } from 'ramda'
import contains from 'ramda/es/contains'
import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

export const ArtifactMorningView: PromptView<ByArtifact> = ({
  done,
  prompt: { artifact: artifactState, player },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  const previousPlayers: PlayerId[] = artifactState.state || []
  const living = values(game.players).filter(p => p.alive)
  const remaining = living.filter(p => !contains(p.id, previousPlayers))
  const choices = remaining.length ? remaining : living

  return (
    <>
      <Typography gutterBottom variant="h2">
        {artifact.title}
      </Typography>
      <Typography gutterBottom>{artifact.description}</Typography>

      <ChooseWerewolfPlayer
        doneText="protect"
        players={choices}
        onDone={([target]) => {
          done([
            updateArtifact({
              artifact: artifactState.type,
              target: player,
              updates: {
                state: remaining.length
                  ? previousPlayers.concat(target.id)
                  : [target],
              },
            }),
            addDelayedAction({
              delayedAction: {
                action: guard({ target: target.id }),
                day: game.day,
                occurrence: 'once',
                time: 'night',
              },
            }),
          ])
        }}
      />
    </>
  )
}

export const ShieldOfTheBodyguard = Artifact({
  type: ArtifactType('shield of the bodyguard'),
  title: 'Shield of the Bodyguard',
  category: 'Imitate Role',
  description:
    'Each day at dawn choose a different player who cannot be eliminated that night.',
  infinite: true,
  MorningView: ArtifactMorningView,
})
