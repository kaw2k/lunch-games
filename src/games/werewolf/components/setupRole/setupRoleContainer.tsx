import * as React from 'react'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { PlayerWerewolf } from '../../interfaces/player'
import { Typography } from '@material-ui/core'
import { ClawViewRole } from './clawViewRole'
import { ArtifactView } from '../artifact/artifactView'
import { FullScreenNotice } from '../../../../components/fullScreenNotice'

interface Props {
  player: PlayerWerewolf
}

export const SetupRoleContainer: React.SFC<Props> = ({ player, children }) => {
  const [viewRole, setViewRole] = React.useState(false)

  if (player.ready) {
    return <FullScreenNotice>Waiting for game to start...</FullScreenNotice>
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
      {player.artifacts.map(artifactState => (
        <ArtifactView player={player} artifactState={artifactState} />
      ))}
      {children}
    </>
  )
}
