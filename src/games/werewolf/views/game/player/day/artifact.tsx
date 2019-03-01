import * as React from 'react'
import cx from 'classnames'
import {
  getArtifact,
  ArtifactState,
} from '../../../../interfaces/artifact/artifacts'
import { Typography, IconButton, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useCommonStyles } from '../../../../../../helpers/commonStyles'
import { GenericArtifactActivateView } from '../../../../components/artifact/genericActivateView'
import { PlayerWerewolf } from '../../../../interfaces/player'

interface Props {
  player: PlayerWerewolf
}

const useStyles = makeStyles({
  artifact: {
    marginBottom: '1em',
  },
})

type View = { type: 'overview' } | { type: 'artifact'; artifact: ArtifactState }

export const WerewolfPlayerDayArtifact: React.SFC<Props> = ({ player }) => {
  const [view, setView] = React.useState<View>({ type: 'overview' })
  const classes = { ...useStyles(), ...useCommonStyles() }

  if (view.type === 'artifact') {
    const artifact = getArtifact(view.artifact.type)
    const View = artifact.ActivateView || GenericArtifactActivateView
    return (
      <View
        artifactState={view.artifact}
        back={() => setView({ type: 'overview' })}
        player={player}
      />
    )
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
                  {artifactState.activated
                    ? artifact.infinite
                      ? 'active'
                      : 'used up'
                    : artifact.infinite
                    ? 'infinite'
                    : 'one time use'}
                </Typography>
              </div>

              {!artifactState.activated && (
                <IconButton
                  className={cx(classes.pullRight)}
                  onClick={() =>
                    setView({ type: 'artifact', artifact: artifactState })
                  }>
                  <Icon>play_circle_filled_white</Icon>
                </IconButton>
              )}
            </div>
            <Typography>{artifact.description}</Typography>
          </div>
        )
      })}
    </>
  )
}
