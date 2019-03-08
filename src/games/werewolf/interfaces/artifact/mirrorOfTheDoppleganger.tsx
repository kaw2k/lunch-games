import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact, ArtifactViewComponent } from './artifacts'
import { updatePlayer, updateArtifact } from '../actions'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { values } from 'ramda'

const ActivateView: ArtifactViewComponent = ({ artifactState, player }) => {
  const { game, runActions } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive)}
      columns={2}
      doneText="copy player"
      onDone={([target]) => {
        runActions([
          updatePlayer({
            target: player.id,
            updates: {
              secondaryRole: game.players[target].role,
            },
          }),
          updateArtifact({
            target: player.id,
            artifact: artifact.type,
            updates: {
              activated: 'played',
            },
          }),
        ])
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
})
