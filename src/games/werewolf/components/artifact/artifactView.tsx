import * as React from 'react'
import { Card, CardContent, Typography, CardActions } from '@material-ui/core'
import { getArtifact, Artifacts } from '../../interfaces/artifact/artifacts'
import { Button } from '../../../../components/button'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { PlayerWerewolf } from '../../interfaces/player'
import { PlayerId } from '../../../../interfaces/player'
import { updateArtifact } from '../../interfaces/actions'
import { ArtifactState } from '../../interfaces/artifact'
import { ActionId } from '../../../../helpers/id'

interface Props {
  artifactState: ArtifactState
  player: PlayerWerewolf

  showPlay?: boolean

  action?: {
    text: string
    callback: () => void
  }
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

export const ArtifactView: React.SFC<Props> = ({
  artifactState,
  player,
  showPlay,
  action,
}) => {
  const { game, runActions } = React.useContext(WerewolfGameContext)
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

      {(showPlay || action) && (
        <CardActions>
          {action && (
            <Button fullWidth={false} size="small" onClick={action.callback}>
              {action.text}
            </Button>
          )}

          {showPlay && artifactState.activated !== 'played' && (
            <Button
              color="green"
              fullWidth={false}
              size="small"
              confirm="are you sure? once you start, there is no going back."
              onClick={() => {
                const artifact = getArtifact(artifactState.type)

                if (artifact.ActivateCallback) {
                  artifact.ActivateCallback({
                    game,
                    prompt: {
                      artifact: artifactState,
                      id: ActionId(),
                      player: player.id,
                      type: 'by artifact',
                    },
                    done: actions => {
                      runActions([
                        toggleArtifact(player.id, artifactState.type, 'played'),
                        ...actions,
                      ])
                    },
                  })
                } else if (artifact.ActivateView) {
                  runActions([
                    toggleArtifact(player.id, artifactState.type, 'playing'),
                  ])
                } else {
                  runActions([
                    toggleArtifact(player.id, artifactState.type, 'played'),
                  ])
                }
              }}>
              play
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  )
}
