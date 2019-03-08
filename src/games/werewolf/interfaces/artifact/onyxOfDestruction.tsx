import { Artifact } from '.'
import React, { useState } from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact, ArtifactViewComponent } from './artifacts'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { values } from 'ramda'
import { PlayerId } from '../../../../interfaces/player'
import { Typography } from '@material-ui/core'
import { Button } from '../../../../components/button'
import { destroyArtifact, updateArtifact } from '../actions'

const ActivateView: ArtifactViewComponent = ({ player }) => {
  const { runActions, game } = React.useContext(WerewolfGameContext)
  const [pid, setPid] = useState<PlayerId | null>(null)
  const artifact = getArtifact('onyx of destruction')

  if (pid) {
    const target = game.players[pid]
    return (
      <>
        <Typography gutterBottom variant="h2">
          {target.name || target.id}
        </Typography>

        {target.artifacts
          .filter(a => !a.activated)
          .map(a => (
            <Button
              color="red"
              onClick={() => {
                runActions([
                  updateArtifact({
                    target: player.id,
                    artifact: 'onyx of destruction',
                    updates: {
                      activated: 'played',
                    },
                  }),
                  destroyArtifact({ target: target.id, artifact: a.type }),
                ])
              }}>
              destroy: {a.type}
            </Button>
          ))}
      </>
    )
  }

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(
        p => p.artifacts.filter(a => !a.activated).length
      )}
      columns={2}
      doneText="select player"
      onDone={([target]) => setPid(target)}
    />
  )
}

export const OnyxOfDestruction = Artifact({
  type: 'onyx of destruction',
  title: 'Onyx of Destruction',
  description:
    'Choose a player with an unrevealed artifact card and remove it from the game.',
  infinite: false,
  ActivateView,
})
