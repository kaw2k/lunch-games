import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { artifactKill, addDelayedAction } from '../actions'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { values } from 'ramda'
import { PromptView, ByArtifact } from '../prompt'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { artifact: artifactState },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive)}
      columns={2}
      doneText="kill eventually"
      onDone={([target]) => {
        done([
          addDelayedAction({
            delayedAction: {
              action: artifactKill({
                target,
              }),
              day: game.day + 1,
              time: 'night',
              occurrence: 'once',
            },
          }),
        ])
      }}
    />
  )
}

export const BreathOfTheOldMan = Artifact({
  type: 'breath of the old man',
  title: 'Breath of the Old Man',
  category: 'Killing',
  description: 'Choose a player to be eliminated the night after the next day.',
  infinite: false,
  ActivateView,
})
