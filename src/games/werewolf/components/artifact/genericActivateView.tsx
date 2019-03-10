import * as React from 'react'
import { getArtifact } from '../../interfaces/artifact/artifacts'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Typography } from '@material-ui/core'
import { updateArtifact } from '../../interfaces/actions'
import { PromptView, ByArtifact } from '../../interfaces/prompt'

export const GenericArtifactActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { artifact: artifactState, player },
}) => {
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
            done([
              updateArtifact({
                target: player,
                artifact: artifactState.type,
                updates: {
                  activated: 'played',
                },
              }),
            ])
          }}>
          play
        </Button>
      </ActionRow>
    </>
  )
}
