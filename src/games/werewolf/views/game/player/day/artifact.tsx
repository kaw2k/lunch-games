import * as React from 'react'
import cx from 'classnames'
import {
  getArtifact,
  Artifacts,
  ArtifactState,
} from '../../../../interfaces/artifact/artifacts'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useCommonStyles } from '../../../../../../helpers/commonStyles'
import { GenericArtifactActivateView } from '../../../../components/artifact/genericActivateView'
import { PlayerWerewolf } from '../../../../interfaces/player'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'
import { updateArtifact } from '../../../../interfaces/actions'
import { PlayerId } from '../../../../../../interfaces/player'
import { Button } from '../../../../../../components/button'

interface Props {
  player: PlayerWerewolf
}

const useStyles = makeStyles({
  artifact: {
    marginBottom: '1em',
  },
})

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
  const classes = { ...useStyles(), ...useCommonStyles() }

  const playingArtifact = player.artifacts.find(a => a.activated === 'playing')
  if (playingArtifact) {
    const artifact = getArtifact(playingArtifact.type)
    const View = artifact.ActivateView || GenericArtifactActivateView
    return <View player={player} artifactState={playingArtifact} />
  }

  return (
    <>
      {player.artifacts.map(artifactState => {
        const artifact = getArtifact(artifactState.type)

        return (
          <div key={artifactState.type} className={classes.artifact}>
            <div className={classes.row}>
              <div>
                <Typography gutterBottom variant="h2">
                  {artifact.title}
                </Typography>

                <Typography
                  color={artifactState.activated ? 'error' : 'textPrimary'}>
                  {artifactState.activated === 'played'
                    ? artifact.infinite
                      ? 'active'
                      : 'used up'
                    : artifact.infinite
                    ? 'infinite'
                    : 'one time use'}
                </Typography>
              </div>
            </div>
            <Typography>{artifact.description}</Typography>
            {artifactState.activated !== 'played' && (
              <Button
                color="green"
                confirm="are you sure? once you start, there is no going back."
                className={cx(classes.pullRight)}
                onClick={() => {
                  runActions([
                    toggleArtifact(player.id, artifactState.type, 'playing'),
                  ])
                }}>
                play artifact
              </Button>
            )}
          </div>
        )
      })}
    </>
  )
}
