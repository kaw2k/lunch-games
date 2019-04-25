import * as React from 'react'
import { Player } from '../../../interfaces/player'
import { Button } from '../../../components/button'
import { Layout } from '../../../components/layout'
import { ActionRow } from '../../../components/actionRow'
import { Profile } from '../../../components/profile'
import { RoomContext } from '../../../helpers/contexts'
import { AvalonLobby, Role } from '../interfaces/game'
import { ChooseGame } from '../../../components/chooseGame'
import { isGameValid } from '../helpers/isGameValid'
import { getParty } from '../helpers/getParty'
import {
  firebaseArrayRemove,
  firebaseArrayAdd,
} from '../../../helpers/firebase'
import {
  Checkbox,
  Typography,
  BottomNavigationAction,
  Badge,
  Icon,
  BottomNavigation,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { playerName } from '../../../components/playerName'
import { PlayerCard } from '../../../components/card/player'
import { Grid } from '../../../components/grid'

interface Props {
  lobby: AvalonLobby
  startGame: (players: Player[]) => void
}

enum View {
  lobby,
  roles,
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

export const LobbyAvalon: React.SFC<Props> = ({ startGame, lobby }) => {
  const classes = useStyles()
  const [view, setView] = React.useState(View.lobby)

  return (
    <Layout padded className={classes.root}>
      {lobby.victoryMessage && (
        <Typography variant="h2">{lobby.victoryMessage}</Typography>
      )}

      <div>
        <Typography variant="h2">Lobby: {lobby.id}</Typography>
        <Typography component="em">
          You need between 5 and 10 players to play. Click on someone to remove
          them from the game.
        </Typography>
      </div>

      <ChooseGame />

      {view === View.lobby && <Players lobby={lobby} />}
      {view === View.roles && <Roles lobby={lobby} />}
      {view === View.start && <StartGame lobby={lobby} startGame={startGame} />}

      <BottomNavigation
        className={classes.nav}
        value={view}
        onChange={(e, val) => setView(val)}>
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
          label="Roles"
          value={View.roles}
          icon={
            <Badge showZero badgeContent={lobby.avalonRoles.length}>
              <Icon>face</Icon>
            </Badge>
          }
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

const StartGame: React.SFC<{
  lobby: AvalonLobby
  startGame: (players: Player[]) => void
}> = ({ lobby, startGame }) => {
  const isValid = isGameValid(lobby.lobbyPlayers.length, lobby.avalonRoles)

  return (
    <>
      {!isValid && (
        <Typography component="em">
          You have an imbalanced team, make sure you have:
          <ul>
            <li>5-6 players: 2 bad</li>
            <li>7-9 players: 3 bad</li>
            <li>10 players: 4 bad</li>
          </ul>
        </Typography>
      )}

      <ActionRow>
        <Button
          color="green"
          onClick={() => startGame(lobby.lobbyPlayers)}
          disabled={
            !isValid ||
            lobby.lobbyPlayers.length < 5 ||
            lobby.lobbyPlayers.length > 10
          }>
          start game
        </Button>
      </ActionRow>
    </>
  )
}

const Players: React.SFC<{
  lobby: AvalonLobby
}> = ({ lobby }) => {
  const { kickPlayer, leaveRoom } = React.useContext(RoomContext)

  return (
    <>
      <Typography variant="h3">Players:</Typography>

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

const Roles: React.SFC<{
  lobby: AvalonLobby
}> = ({ lobby }) => {
  const { updateRoom } = React.useContext(RoomContext)

  function rolesInGame(role: Role): number {
    return lobby.avalonRoles.filter(r => r === role).length
  }

  function updateRoles(role: Role) {
    if (role !== 'good' && role !== 'bad') {
      if (rolesInGame(role)) {
        updateRoom({
          avalonRoles: firebaseArrayRemove(role),
        })
      } else {
        updateRoom({
          avalonRoles: firebaseArrayAdd(role),
        })
      }
    } else if (
      (role === 'good' && rolesInGame('good') > 5) ||
      (role === 'bad' && rolesInGame('bad') > 3)
    ) {
      updateRoom({
        avalonRoles: firebaseArrayRemove(role),
      })
    } else {
      updateRoom({
        avalonRoles: lobby.avalonRoles.concat(role),
      })
    }
  }

  const roles: { role: Role; message: string }[] = [
    { role: 'merlin', message: 'knows all bad guys' },
    { role: 'percival', message: 'tries to protect merlin' },
    { role: 'good', message: 'try to pass good missions' },
    { role: 'morgana', message: 'pretends to be merlin' },
    { role: 'assassin', message: 'tries to kill merlin' },
    { role: 'mordred', message: 'unknown to merlin' },
    { role: 'bad', message: 'try to pass bad missions' },
  ]

  return (
    <>
      <Button
        onClick={() =>
          updateRoom({ avalonLadyOfTheLake: false, avalonRoles: [] })
        }>
        reset
      </Button>

      <Typography variant="h3">Roles:</Typography>

      {roles.map(({ role, message }) => (
        <Profile
          key={role}
          text={role}
          subtext={message}
          profileText={rolesInGame(role)}
          onClick={() => updateRoles(role)}
          color={getParty(role) === 'bad' ? 'red' : 'blue'}
        />
      ))}
      <label htmlFor="lol">
        <Typography component="span" inline>
          Lady of the lake:
        </Typography>
        <Checkbox
          id="lol"
          type="checkbox"
          checked={lobby.avalonLadyOfTheLake}
          onChange={e => {
            updateRoom({
              avalonLadyOfTheLake: e.target.checked,
              avalonRoles: lobby.avalonRoles,
            })
          }}
        />
      </label>
    </>
  )
}
