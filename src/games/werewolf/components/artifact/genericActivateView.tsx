import * as React from 'react'
import { ArtifactViewComponent } from '../../interfaces/artifact'
import { getArtifact } from '../../interfaces/artifact/artifacts'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Typography } from '@material-ui/core'
import { activateArtifact } from '../../interfaces/actions'
import { WerewolfGameContext } from '../../../../helpers/contexts'

export const GenericArtifactActivateView: ArtifactViewComponent = ({
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
        <Button onClick={back}>cancel</Button>
        <Button
          color="green"
          onClick={() => {
            runActions([
              activateArtifact({
                target: player.id,
                artifact: artifactState.type,
              }),
            ])
            back()
          }}>
          play
        </Button>
      </ActionRow>
    </>
  )
}
