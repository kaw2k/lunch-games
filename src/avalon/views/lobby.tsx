import * as React from 'react'
import { Player } from '../../interfaces/player'
import { Button } from '../../components/button'
import { Layout } from '../../components/layout'
import { ActionRow } from '../../components/actionRow'
import { Profile } from '../../components/profile'
import { RoomContext } from '../../helpers/contexts'
import { AvalonLobby, Role } from '../interfaces/game'
import { ChooseGame } from '../../components/chooseGame'
import { isGameValid } from '../helpers/isGameValid'
import { getParty } from '../helpers/getParty'
import { Input } from '../../components/input'
import { firebaseArrayRemove, firebaseArrayAdd } from '../../helpers/firebase'

interface Props {
  lobby: AvalonLobby
  startGame: (players: Player[]) => void
}

export const LobbyAvalon: React.SFC<Props> = ({ startGame, lobby }) => {
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
      {lobby.victoryMessage && <h1>{lobby.victoryMessage}</h1>}

      <div>
        <h2>Lobby: {lobby.id}</h2>
        <em>
          You need between 5 and 10 players to play. Click on someone to remove
          them from the game.
        </em>
      </div>

      <ChooseGame />

      <div className="flex">
        <Layout>
          <h2>Players:</h2>
          {lobby.lobbyPlayers.map(p => (
            <Profile
              key={p.id}
              text={p.name || p.id}
              image={p.profileImg}
              onClick={() => kickPlayer(p)}
            />
          ))}
        </Layout>

        <Layout>
          <h2>
            Roles:{' '}
            <Button
              onClick={() => updateRoom({ ladyOfTheLake: false, roles: [] })}>
              reset
            </Button>
          </h2>
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
          <Input
            label="Lady of the lake:"
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
        </Layout>
      </div>

      {!isValid && (
        <div>
          <em>
            You have an imbalanced team, make sure you have:
            <ul>
              <li>5-6 players: 2 bad</li>
              <li>7-9 players: 3 bad</li>
              <li>10 players: 4 bad</li>
            </ul>
          </em>
        </div>
      )}

      <ActionRow>
        <Button padded onClick={leaveRoom}>
          leave
        </Button>
        <Button
          padded
          onClick={() => startGame(lobby.lobbyPlayers)}
          disabled={
            !isValid ||
            lobby.lobbyPlayers.length < 5 ||
            lobby.lobbyPlayers.length > 10
          }>
          start game
        </Button>
      </ActionRow>

      <style jsx>{`
        .flex {
          display: flex;
        }
        .flex > :global(*) {
          width: 100%;
          flex: 1 1 50%;
        }
        li {
          list-style: disc;
          list-style-position: inside;
        }
      `}</style>
    </Layout>
  )
}
