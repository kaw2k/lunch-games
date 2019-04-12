import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { artifactKill, addDelayedAction } from '../actions'
import { values } from 'ramda'
import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { artifact: artifactState },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  return (
    <ChooseWerewolfPlayer
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive)}
      doneText="kill eventually"
      onDone={([target]) => {
        done([
          addDelayedAction({
            delayedAction: {
              action: artifactKill({
                target: target.id,
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
  type: ArtifactType('breath of the old man'),
  title: 'Breath of the Old Man',
  category: 'Killing',
  description: 'Choose a player to be eliminated the night after the next day.',
  infinite: false,
  ActivateView,
})
