import * as React from 'react'
import {
  getArtifact,
  Artifacts,
  ArtifactState,
} from '../../../../interfaces/artifact/artifacts'
import { Typography, Card, CardContent, CardActions } from '@material-ui/core'
import { PlayerWerewolf } from '../../../../interfaces/player'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'
import { updateArtifact } from '../../../../interfaces/actions'
import { PlayerId } from '../../../../../../interfaces/player'
import { Button } from '../../../../../../components/button'

interface Props {
  player: PlayerWerewolf
}

function toggleArtifact(
  player: PlayerId,
  artifact: Artifacts,
  state: ArtifactState['activated']
) {
  return updateArtifact({
    target: player,
    artifact,
    updates: {
      activated: state,
    },
  })
}

export const WerewolfPlayerDayArtifact: React.SFC<Props> = ({ player }) => {
  const { runActions } = React.useContext(WerewolfGameContext)

  return (
    <>
      {player.artifacts.map(artifactState => {
        const artifact = getArtifact(artifactState.type)

        return (
          <Card key={artifactState.type}>
            <CardContent>
              <Typography gutterBottom variant="h2">
                {artifact.title}
              </Typography>

              <Typography
                gutterBottom
                color={artifactState.activated ? 'error' : 'textPrimary'}>
                {artifactState.activated === 'played'
                  ? artifact.infinite
                    ? 'active'
                    : 'used up'
                  : artifact.infinite
                  ? 'infinite'
                  : 'one time use'}
              </Typography>

              <Typography>{artifact.description}</Typography>
            </CardContent>

            {artifactState.activated !== 'played' && (
              <CardActions>
                <Button
                  color="green"
                  fullWidth={false}
                  size="small"
                  confirm="are you sure? once you start, there is no going back."
                  onClick={() => {
                    if (getArtifact(artifactState.type).ActivateView) {
                      runActions([
                        toggleArtifact(
                          player.id,
                          artifactState.type,
                          'playing'
                        ),
                      ])
                    } else {
                      runActions([
                        toggleArtifact(player.id, artifactState.type, 'played'),
                      ])
                    }
                  }}>
                  play
                </Button>
              </CardActions>
            )}
          </Card>
        )
      })}
    </>
  )
}
