import * as React from 'react'
import { Artifact, ArtifactViewComponent } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { updateArtifact, artifactKill } from '../actions'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { values } from 'ramda'
import { addDelayedAction } from '../../helpers/addAction'

const ActivateView: ArtifactViewComponent = ({
  artifactState,
  back,
  player,
}) => {
  const { runActions, game, updateGame } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive)}
      columns={2}
      cancelText="cancel"
      onCancel={back}
      doneText="kill eventually"
      onDone={([target]) => {
        updateGame(
          addDelayedAction(
            {
              action: artifactKill({
                target,
              }),
              day: game.dayCount + 1,
              time: 'night',
              occurrence: 'once',
            },
            game
          )
        )

        runActions([
          updateArtifact({
            target: player.id,
            artifact: artifact.type,
            updates: {
              activated: 'played',
            },
          }),
        ])
        back()
      }}
    />
  )
}

export const BreathOfTheOldMan = Artifact({
  type: 'breath of the old man',
  title: 'Breath of the Old Man',
  description: 'Choose a player to be eliminated the night after the next day.',
  infinite: false,
  ActivateView,
})
