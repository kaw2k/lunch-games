import * as React from 'react'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { PlayerWerewolf } from '../../interfaces/player'
import { makeStyles } from '@material-ui/styles'
import { colors, Typography } from '@material-ui/core'
import { ClawViewRole } from './clawViewRole'
import { ArtifactView } from '../artifact/artifactView';

interface Props {
  player: PlayerWerewolf
}

const useStyles = makeStyles({
  done: {
    position: 'fixed',
    top: '1em',
    bottom: '1em',
    right: '1em',
    left: '1em',
    background: colors.green[400],
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
  },
})

export const SetupRoleContainer: React.SFC<Props> = ({ player, children }) => {
  const [viewRole, setViewRole] = React.useState(false)
  const classes = useStyles()

  if (player.ready) {
    return (
      <div className={classes.done}>
        <Typography variant="h1" color="inherit" align="center">
          waiting for other players
        </Typography>
      </div>
    )
  }

  if (!viewRole) {
    return (
      <>
        <Typography variant="h1" gutterBottom>
          Ready to view your role?
        </Typography>
        <Typography component="em">
          Don't worry, you can view your role and allies (if you have any) in
          the game in the overflow menu.
        </Typography>
        <ActionRow fixed>
          <Button onClick={() => setViewRole(true)}>view role</Button>
        </ActionRow>
      </>
    )
  }

  return (
    <>
      <ClawViewRole />
      {player.artifacts.map(artifactState =>
          <ArtifactView player={player} artifactState={artifactState}/>
        )}
      {children}
    </>
  )
}
