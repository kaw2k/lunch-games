import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { getArtifact } from './artifacts'
import { updateArtifact, guard, addDelayedAction } from '../actions'
import { PlayerId } from '../../../../interfaces/player'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { values } from 'ramda'
import contains from 'ramda/es/contains'
import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'

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

      <ChoosePlayers
        columns={2}
        doneText="protect"
        onDone={([target]) => {
          done([
            updateArtifact({
              artifact: artifactState.type,
              target: player,
              updates: {
                state: remaining.length
                  ? previousPlayers.concat(target)
                  : [target],
              },
            }),
            addDelayedAction({
              delayedAction: {
                action: guard({ target }),
                day: game.day,
                occurrence: 'once',
                time: 'night',
              },
            }),
          ])
        }}
        players={choices}>
        {props => <WerewolfProfile key={props.player.id} {...props} />}
      </ChoosePlayers>
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
