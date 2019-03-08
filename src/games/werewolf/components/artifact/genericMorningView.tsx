import * as React from 'react'
import {
  getArtifact,
  ArtifactViewComponent,
} from '../../interfaces/artifact/artifacts'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Typography } from '@material-ui/core'
import { updateArtifact } from '../../interfaces/actions'
import { WerewolfGameContext } from '../../../../helpers/contexts'

export const GenericArtifactMorningView: ArtifactViewComponent = ({
  artifactState,
  player,
}) => {
  const { runActions } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  return (
    <>
      <Typography gutterBottom variant="h2">
        {artifact.title}
      </Typography>
      <Typography gutterBottom>{artifact.description}</Typography>

      <ActionRow fixed>
        <Button
          color="green"
          onClick={() => {
            runActions([
              updateArtifact({
                target: player.id,
                artifact: artifactState.type,
                updates: {
                  performedMorningAction: true,
                },
              }),
            ])
          }}>
          done
        </Button>
      </ActionRow>
    </>
  )
}
