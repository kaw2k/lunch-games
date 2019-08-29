import * as React from 'react'
import { WerewolfLobby, WerewolfResults } from '../../../interfaces/game'
import {
  BottomNavigationAction,
  BottomNavigation,
  Icon,
  Badge,
} from '@material-ui/core'
import { PlayerView } from '../player'
import { WerewolfModeratorLobbyRoles } from './roles'
import { WerewolfModeratorLobbyArtifacts } from './artifacts'
import { WerewolfModeratorLobbyStart } from './start'
import { WerewolfModeratorLobbyOptions } from './options'
import { Roles } from '../../../interfaces/card/cards'
import { getWeight } from '../../../helpers/getWeight'
import { isModerator } from '../../../helpers/isModerator'
import { isSpectator } from '../../../../../helpers/isSpectator'
import { Button } from '../../../../../components/button'
import { useCommonStyles } from '../../../../../helpers/commonStyles'
import { Layout } from '../../../../../components/layout'

interface Props {
  lobby: WerewolfLobby | WerewolfResults
  startGame: (roles: Roles[]) => void
  toggleModerator: () => void
  toggleSpectator: () => void
}

enum View {
  lobby,
  roles,
  artifacts,
  options,
  start,
}

export const WerewolfModeratorLobby: React.SFC<Props> = ({
  startGame,
  lobby,
  toggleModerator,
}) => {
  const [view, setView] = React.useState(View.lobby)
  const classes = useCommonStyles()

  return (
    <Layout hasTabs padded>
      {view === View.lobby && (
        <>
          <PlayerView lobby={lobby} />
          <Button onClick={toggleModerator}>Stop Moderating</Button>
        </>
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
        showLabels
        value={view}
        onChange={(e, val) => setView(val)}>
        <BottomNavigationAction
          label="Lobby"
          value={View.lobby}
          icon={
            <Badge
              badgeContent={
                lobby.lobbyPlayers.filter(
                  p => !isModerator(p, lobby) && !isSpectator(p, lobby)
                ).length
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
              color={
                getWeight(lobby.werewolfRoles) < 0 ? 'secondary' : 'primary'
              }
              badgeContent={`${lobby.werewolfRoles.length}/${getWeight(
                lobby.werewolfRoles
              )}`}>
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
    </Layout>
  )
}
