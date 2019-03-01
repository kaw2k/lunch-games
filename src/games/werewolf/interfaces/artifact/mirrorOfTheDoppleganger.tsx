import * as React from 'react'
import { Artifact, ArtifactViewComponent } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { updatePlayer, activateArtifact } from '../actions'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { values } from 'ramda'

const ActivateView: ArtifactViewComponent = ({
  artifactState,
  back,
  player,
}) => {
  const { runActions, game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive)}
      columns={2}
      cancelText="cancel"
      onCancel={back}
      doneText="copy player"
      onDone={([target]) => {
        runActions([
          updatePlayer({
            target: player.id,
            updates: {
              secondaryRole: game.players[target].role,
            },
          }),
          activateArtifact({
            target: player.id,
            artifact: artifact.type,
          }),
        ])
        back()
      }}
    />
  )
}

export const MirrorOfTheDoppleganger = Artifact({
  type: 'mirror of the doppleganger',
  title: 'Mirror of the Doppleganger',
  description:
    'Choose a player and secretly view their role. You now have that players special power in addition to yours.',
  infinite: true,
  ActivateView,
  MorningView: null,
})
