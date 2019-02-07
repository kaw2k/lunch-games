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
import { Checkbox, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

interface Props {
  lobby: AvalonLobby
  startGame: (players: Player[]) => void
}

const useStyles = makeStyles({
  columns: {
    display: 'flex',
    alignItems: 'flex-start',
    '& > *': {
      flex: '1 1 50%',
    },
  },
})

export const LobbyAvalon: React.SFC<Props> = ({ startGame, lobby }) => {
  const classes = useStyles()
  const { kickPlayer, leaveRoom, updateRoom } = React.useContext(RoomContext)

  function rolesInGame(role: Role): number {
    return lobby.roles.filter(r => r === role).length
  }

  function updateRoles(role: Role) {
    if (role !== 'good' && role !== 'bad') {
      if (rolesInGame(role)) {
        updateRoom({
          roles: firebaseArrayRemove(role),
        })
      } else {
        updateRoom({
          roles: firebaseArrayAdd(role),
        })
      }
    } else if (
      (role === 'good' && rolesInGame('good') > 5) ||
      (role === 'bad' && rolesInGame('bad') > 3)
    ) {
      updateRoom({
        roles: firebaseArrayRemove(role),
      })
    } else {
      updateRoom({
        roles: lobby.roles.concat(role),
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

  const isValid = isGameValid(lobby.lobbyPlayers.length, lobby.roles)

  return (
    <Layout padded>
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

      <div className={classes.columns}>
        <div>
          <Typography variant="h3">Players:</Typography>
          {lobby.lobbyPlayers.map(p => (
            <Profile
              key={p.id}
              text={p.name || p.id}
              image={p.profileImg}
              onClick={() => kickPlayer(p)}
            />
          ))}
        </div>

        <div>
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
              checked={lobby.ladyOfTheLake}
              onChange={e => {
                updateRoom({
                  ladyOfTheLake: e.target.checked,
                  roles: lobby.roles,
                })
              }}
            />
          </label>
          <Button
            onClick={() => updateRoom({ ladyOfTheLake: false, roles: [] })}>
            reset
          </Button>
        </div>
      </div>

      {!isValid && (
        <div>
          <Typography component="em">
            You have an imbalanced team, make sure you have:
            <ul>
              <li>5-6 players: 2 bad</li>
              <li>7-9 players: 3 bad</li>
              <li>10 players: 4 bad</li>
            </ul>
          </Typography>
        </div>
      )}

      <ActionRow fixed>
        <Button onClick={leaveRoom}>leave</Button>
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
    </Layout>
  )
}
