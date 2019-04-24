import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { artifactKill } from '../actions'
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
      doneText="kill"
      onDone={([target]) => {
        done([
          artifactKill({
            target: target.id,
          }),
        ])
      }}
    />
  )
}

export const SpearOfFury = Artifact({
  type: ArtifactType('spear of fury'),
  title: 'Speaer of Fury',
  category: 'Killing',
  description: 'Reveal your role to everyone. You may now kill ay one person.',
  infinite: false,
  ActivateView,
})
