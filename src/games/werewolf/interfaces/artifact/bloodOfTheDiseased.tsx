import * as React from 'react'
import { Artifact } from '.'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { passArtifact } from '../actions'
import { getArtifact } from './artifacts'
import { PromptView, ByArtifact } from '../prompt'

const ActivateView: PromptView<ByArtifact> = ({ done, prompt: { player } }) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact('blood of the diseased')

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive)}
      columns={2}
      doneText="make diseased"
      onDone={([target]) => {
        done([
          passArtifact({
            artifact: 'blood of the diseased',
            source: player,
            target,
          }),
        ])
      }}
    />
  )
}

export const BloodOfTheDiseased = Artifact({
  type: 'blood of the diseased',
  title: 'Blood of the Diseased',
  category: 'Imitate Role',
  description:
    'Choose a player to become infected with disease. If the werewolves eliminate that player, they do not get to choose a target the following night.',
  infinite: true,
  ActivateView,
})
