import * as React from 'react'
import { getArtifact } from '../../interfaces/artifact/artifacts'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Typography } from '@material-ui/core'
import { ByArtifact, PromptView } from '../../interfaces/prompt'

export const GenericArtifactMorningView: PromptView<ByArtifact> = ({
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
        <Button color="green" onClick={() => done([])}>
          done
        </Button>
      </ActionRow>
    </>
  )
}
