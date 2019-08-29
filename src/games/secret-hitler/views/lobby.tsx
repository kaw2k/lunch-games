import * as React from 'react'
import { Player } from '../../../interfaces/player'
import { Button } from '../../../components/button'
import { Layout } from '../../../components/layout'
import { ActionRow } from '../../../components/actionRow'
import { RoomContext } from '../../../helpers/contexts'
import { SecretHitlerLobby, SecretHitlerResults } from '../interfaces/game'
import { ChooseGame } from '../../../components/chooseGame'
import {
  Typography,
  BottomNavigation,
  Icon,
  Badge,
  BottomNavigationAction,
} from '@material-ui/core'
import { Rules } from '../components/rules'
import { playerName } from '../../../components/playerName'
import { Grid } from '../../../components/grid'
import { PlayerCard } from '../../../components/card/player'
import { makeStyles } from '@material-ui/styles'
import { Results } from './gameResults'

interface Props {
  lobby: SecretHitlerLobby | SecretHitlerResults
  startGame: (players: Player[]) => void
}

enum View {
  results,
  rules,
  lobby,
  start,
}

const useStyles = makeStyles({
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
  },
  root: {
    marginBottom: '56px',
  },
})

export const LobbySecretHitler: React.SFC<Props> = ({ startGame, lobby }) => {
  const { room } = React.useContext(RoomContext)
  const [view, setView] = React.useState(
    room.type === 'secret-hitler-results' ? View.results : View.lobby
  )
  const classes = useStyles()

  return (
    <Layout padded className={classes.root}>
      {view === View.results && lobby.type === 'secret-hitler-results' && (
        <Results lobby={lobby} done={() => setView(View.lobby)} />
      )}

      {view === View.rules && <Rules />}

      {((view === View.results && lobby.type !== 'secret-hitler-results') ||
        view === View.lobby) && <LobbyView lobby={lobby} />}

      <BottomNavigation
        className={classes.nav}
        value={view}
        showLabels
        onChange={(e, val) => {
          if (val === View.start) {
            if (
              lobby.lobbyPlayers.length < 5 ||
              lobby.lobbyPlayers.length > 10
            ) {
              return alert('Incorrect number or players')
            }
            startGame(lobby.lobbyPlayers)
          } else {
            setView(val)
          }
        }}>
        {room.type === 'secret-hitler-results' && (
          <BottomNavigationAction
            label="Results"
            value={View.results}
            icon={<Icon>star</Icon>}
          />
        )}

        <BottomNavigationAction
          label="Lobby"
          value={View.lobby}
          icon={
            <Badge badgeContent={lobby.lobbyPlayers.length}>
              <Icon>group</Icon>
            </Badge>
          }
        />

        <BottomNavigationAction
          label="Rules"
          value={View.rules}
          icon={<Icon>description</Icon>}
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

const LobbyView: React.SFC<{
  lobby: SecretHitlerLobby | SecretHitlerResults
}> = ({ lobby }) => {
  const { kickPlayer, leaveRoom } = React.useContext(RoomContext)

  return (
    <>
      <div>
        <Typography variant="h2">Lobby: {lobby.id}</Typography>
        <Typography component="em">
          You need between 5 and 10 players to play. Click on someone to remove
          them from the game.
        </Typography>
      </div>

      <ChooseGame />

      <Grid>
        {lobby.lobbyPlayers.map(p => (
          <PlayerCard
            key={p.id}
            player={p}
            onClick={() =>
              confirm(`Do you want to kick ${playerName(p)}`) && kickPlayer(p)
            }
          />
        ))}
      </Grid>

      <ActionRow>
        <Button onClick={leaveRoom}>leave</Button>
      </ActionRow>
    </>
  )
}
