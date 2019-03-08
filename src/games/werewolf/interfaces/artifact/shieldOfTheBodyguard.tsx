import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { getArtifact, ArtifactViewComponent } from './artifacts'
import { updateArtifact, guard } from '../actions'
import { PlayerId } from '../../../../interfaces/player'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { values } from 'ramda'
import { addDelayedAction } from '../../helpers/addAction'
import contains from 'ramda/es/contains'

export const ArtifactMorningView: ArtifactViewComponent = ({
  artifactState,
  player,
}) => {
  const { game, runActions, updateGame } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  const previousPlayers: PlayerId[] = artifactState.state || []

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
          updateGame(
            addDelayedAction(
              {
                action: guard({ target }),
                day: game.day + 1,
                occurrence: 'once',
                time: 'night',
              },
              game
            )
          )

          runActions([
            updateArtifact({
              artifact: artifactState.type,
              target: player.id,
              updates: {
                state: previousPlayers.concat(target),
                performedMorningAction: true,
              },
            }),
          ])
        }}
        players={values(game.players).filter(
          p => p.alive && !contains(p.id, previousPlayers)
        )}>
        {props => <WerewolfProfile key={props.player.id} {...props} />}
      </ChoosePlayers>
    </>
  )
}

export const ShieldOfTheBodyguard = Artifact({
  type: 'shield of the bodyguard',
  title: 'Shield of the Bodyguard',
  description:
    'Each day at dawn choose a different player who cannot be eliminated that night.',
  infinite: true,
  MorningView: ArtifactMorningView,
})
