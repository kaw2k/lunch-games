import * as React from 'react'
import { WerewolfLobby } from '../../../interfaces/game'
import {
  BottomNavigationAction,
  BottomNavigation,
  Icon,
  Badge,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { WerewolfPlayerLobby } from '../player'
import { WerewolfModeratorLobbyRoles } from './roles'
import { WerewolfModeratorLobbyArtifacts } from './artifacts'
import { WerewolfModeratorLobbyStart } from './start'
import { WerewolfModeratorLobbyOptions } from './options'
import { Roles } from '../../../interfaces/card/cards'
import { getWeight } from '../../../helpers/getWeight'
import { isModerator } from '../../../helpers/isModerator'

interface Props {
  lobby: WerewolfLobby
  startGame: (roles: Roles[]) => void
  toggleModerator: () => void
}

enum View {
  lobby,
  roles,
  artifacts,
  options,
  start,
}

const useStyles = makeStyles({
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
  root: {
    marginBottom: '56px',
  },
})

export const WerewolfModeratorLobby: React.SFC<Props> = ({
  startGame,
  lobby,
  toggleModerator,
}) => {
  const [view, setView] = React.useState(View.lobby)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {view === View.lobby && (
        <WerewolfPlayerLobby lobby={lobby} toggleModerator={toggleModerator} />
      )}

      {view === View.roles && <WerewolfModeratorLobbyRoles lobby={lobby} />}
      {view === View.artifacts && (
        <WerewolfModeratorLobbyArtifacts lobby={lobby} />
      )}
      {view === View.options && <WerewolfModeratorLobbyOptions lobby={lobby} />}
      {view === View.start && (
        <WerewolfModeratorLobbyStart lobby={lobby} startGame={startGame} />
      )}

      <BottomNavigation
        className={classes.nav}
        value={view}
        onChange={(e, val) => setView(val)}>
        <BottomNavigationAction
          label="Lobby"
          value={View.lobby}
          icon={
            <Badge
              badgeContent={
                lobby.lobbyPlayers.filter(p => !isModerator(p, lobby)).length
              }>
              <Icon>group</Icon>
            </Badge>
          }
        />
        <BottomNavigationAction
          label="Roles"
          value={View.roles}
          icon={
            <Badge
              showZero
              color={getWeight(lobby.werewolfRoles) < 0 ? 'secondary' : 'primary'}
              badgeContent={`${lobby.werewolfRoles.length}/${getWeight(lobby.werewolfRoles)}`}>
              <Icon>face</Icon>
            </Badge>
          }
        />
        <BottomNavigationAction
          label="Artifacts"
          value={View.artifacts}
          icon={
            <Badge badgeContent={lobby.werewolfArtifacts.length}>
              <Icon>book</Icon>
            </Badge>
          }
        />
        <BottomNavigationAction
          label="Options"
          value={View.options}
          icon={<Icon>build</Icon>}
        />
        <BottomNavigationAction
          label="Start"
          value={View.start}
          icon={<Icon>play_arrow</Icon>}
        />
      </BottomNavigation>
    </div>
  )
}
