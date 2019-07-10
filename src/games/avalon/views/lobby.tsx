import * as React from 'react'
import { Player } from '../../../interfaces/player'
import { Button } from '../../../components/button'
import { Layout } from '../../../components/layout'
import { ActionRow } from '../../../components/actionRow'
import { Profile } from '../../../components/profile'
import { RoomContext } from '../../../helpers/contexts'
import { AvalonLobby, Role } from '../interfaces/game'
import { ChooseGame } from '../../../components/chooseGame'
import { isGameValid, helpText } from '../helpers/isGameValid'
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
import { useCommonStyles } from '../../../helpers/commonStyles'
import { count } from '../../../helpers/count'
import values from 'ramda/es/values'
import {Rules} from '../components/rules'

interface Props {
  lobby: AvalonLobby
  startGame: (players: Player[]) => void
}

enum View {
  lobby,
  roles,
  rules,
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

  const isValid = isGameValid(lobby.lobbyPlayers.length, lobby.avalonRoles)

  return (
    <Layout padded className={classes.root}>
      {lobby.victoryMessage && (
        <Typography variant="h2">{lobby.victoryMessage}</Typography>
      )}

      <Typography variant="h2">Lobby: {lobby.id}</Typography>

      {view === View.lobby && <Players lobby={lobby} />}
      {view === View.roles && <Roles lobby={lobby} />}
      {view === View.rules && 
         <Rules/>
      }

      <BottomNavigation
        className={classes.nav}
        value={view}
        onChange={(e, val) => {
          if (val === View.start) {
            if (isValid) {
              startGame(lobby.lobbyPlayers)
            } else {
              const count = lobby.lobbyPlayers.length
              if (count === 5 || count === 6)
                return alert(`You need 2 bad players`)
              if (count === 7 || count === 8 || count === 9)
                return alert(`You need 3 bad players`)
              if (count === 10) return alert(`You need 4 bad players`)

              return alert(`The game is not balanced`)
            }
          } else {
            setView(val)
          }
        }}>
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
          label="Rules"
          value={View.rules}
          icon={
            <Icon>description</Icon>
          }
        />

        <BottomNavigationAction
          label="Start"
          value={View.start}
          icon={<Icon color={isValid ? 'default' : 'error'}>play_arrow</Icon>}
        />
      </BottomNavigation>
    </Layout>
  )
}

const Players: React.SFC<{
  lobby: AvalonLobby
}> = ({ lobby }) => {
  const { kickPlayer, leaveRoom } = React.useContext(RoomContext)

  return (
    <>
      <Typography component="em">
        You need between 5 and 10 players to play. Click on someone to remove
        them from the game.
      </Typography>

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

const Roles: React.SFC<{
  lobby: AvalonLobby
}> = ({ lobby }) => {
  const { updateRoom } = React.useContext(RoomContext)
  const classes = useCommonStyles()

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

  type R = { role: Role; message: string }
  const good: R[] = [
    { role: 'merlin', message: 'knows all bad guys' },
    { role: 'percival', message: 'tries to protect merlin' },
    { role: 'good', message: 'try to pass good missions' },
  ]

  const bad: R[] = [
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

      <Typography variant="h3">Advice:</Typography>
      {helpText(values(lobby.lobbyPlayers).length)}

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
              avalonExcalibur: lobby.avalonExcalibur,
              avalonRoles: lobby.avalonRoles,
            })
          }}
        />
      </label>

      <label htmlFor="lol">
        <Typography component="span" inline>
          Excalibur:
        </Typography>
        <Checkbox
          id="excalibur"
          type="checkbox"
          checked={lobby.avalonExcalibur}
          onChange={e => {
            updateRoom({
              avalonExcalibur: e.target.checked,
              avalonLadyOfTheLake: lobby.avalonLadyOfTheLake,
              avalonRoles: lobby.avalonRoles,
            })
          }}
        />
      </label>

      <div className={classes.twoColumns}>
        <div>
          <Typography variant="h3">
            Good: {count(lobby.avalonRoles, r => getParty(r) === 'good')}
          </Typography>
          {good.map(({ role, message }) => (
            <Profile
              key={role}
              text={role}
              subtext={message}
              profileText={rolesInGame(role)}
              onClick={() => updateRoles(role)}
              color={getParty(role) === 'bad' ? 'red' : 'blue'}
            />
          ))}
        </div>

        <div>
          <Typography variant="h3">
            Bad: {count(lobby.avalonRoles, r => getParty(r) === 'bad')}
          </Typography>
          {bad.map(({ role, message }) => (
            <Profile
              key={role}
              text={role}
              subtext={message}
              profileText={rolesInGame(role)}
              onClick={() => updateRoles(role)}
              color={getParty(role) === 'bad' ? 'red' : 'blue'}
            />
          ))}
        </div>
      </div>
    </>
  )
}
