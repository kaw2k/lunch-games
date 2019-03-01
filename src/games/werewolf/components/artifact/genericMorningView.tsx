import * as React from 'react'
import { ArtifactViewComponent } from '../../interfaces/artifact'
import { getArtifact } from '../../interfaces/artifact/artifacts'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Typography } from '@material-ui/core'
import { performMorningAction } from '../../interfaces/actions'
import { WerewolfGameContext } from '../../../../helpers/contexts'

export const GenericArtifactMorningView: ArtifactViewComponent = ({
  artifactState,
  back,
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
              performMorningAction({
                target: player.id,
                artifact: artifactState.type,
              }),
            ])
            back()
          }}>
          done
        </Button>
      </ActionRow>
    </>
  )
}
