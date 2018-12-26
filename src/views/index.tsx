import * as React from 'react'
import { useRoom, addLeaderboard, useAuthState } from '../helpers/firebase'
import { Login } from './login'
import { SelectLobby } from './selectLobby'
import { Loading } from '../components/loading'
import { Error } from '../components/error'
import { LobbyView } from './lobby'
import { GameView } from './game/index'
import { shuffle } from '../helpers/shuffle'
import { Cards, assignRoles, updatePlayer } from '../helpers/game'
import { PlayerGame } from '../interfaces/player'
import { ViewRole } from './viewRole'
import { GameContext } from '../helpers/contexts'
import { isParty } from '../interfaces/game'

export const App: React.SFC<{}> = () => {
  const playerResult = useAuthState()

  const roomResult = useRoom(
    (!playerResult.loading && !playerResult.error && playerResult.data) || null
  )

  // Generic screens
  if (playerResult.loading || roomResult.loading) return <Loading />
  if (playerResult.error || roomResult.error) return <Error />

  const player = playerResult.data
  const room = roomResult.data

  // Login
  if (!player) return <Login login={playerResult.signIn} />

  // Join a lobby
  if (!room)
    return (
      <SelectLobby
        player={player}
        logOut={playerResult.signOut}
        joinLobby={id => roomResult.joinRoom(id)}
        setProfileImg={playerResult.setProfileImg}
        setPlayer={playerResult.setPlayer}
      />
    )

  // Game screens
  if (room.type === 'lobby')
    return (
      <LobbyView
        lobby={room}
        player={player}
        leave={roomResult.leaveRoom}
        kickPlayer={id => {
          roomResult.updateRoom({
            id: room.id,
            type: 'lobby',
            lobbyPlayers: room.lobbyPlayers.filter(p => p.id !== id),
          })
        }}
        startGame={players => {
          roomResult.updateRoom({
            type: 'game',
            id: room.id,
            lobbyPlayers: room.lobbyPlayers,
            playedCards: [],
            remainingCards: shuffle(Cards),
            discardedCards: [],
            players: assignRoles(players),
            chaos: 0,
            previousGovernment: null,
            government: null,
            performPower: null,
          })
        }}
      />
    )

  if (room.type === 'game') {
    const allReady = room.players.reduce((memo, p) => memo && p.ready, true)
    const currentPlayer = room.players.find(
      p => p.id === player.id
    ) as PlayerGame

    if (!allReady) {
      return (
        <ViewRole
          player={currentPlayer}
          game={room}
          endGame={() => {
            roomResult.updateRoom({
              id: room.id,
              type: 'lobby',
              lobbyPlayers: room.lobbyPlayers,
              victoryMessage: null,
            })
          }}
          ready={() =>
            roomResult.updateRoom(
              updatePlayer(room, player.id, { ready: true })
            )
          }
        />
      )
    } else {
      return (
        <GameContext.Provider
          value={{
            game: room,
            player: currentPlayer,
            updateGame: game => roomResult.updateRoom({ ...room, ...game }),
            endGame: (message: unknown = null) => {
              roomResult.updateRoom({
                id: room.id,
                type: 'lobby',
                lobbyPlayers: room.lobbyPlayers,
                victoryMessage: typeof message === 'string' ? message : null,
              })

              if (isParty(message)) {
                addLeaderboard({
                  date: Date.now(),
                  gameType: 'secret hitler',
                  winners: room.players
                    .filter(p => p.role.party === message)
                    .map(p => ({
                      id: p.id,
                      role: p.role.isHitler ? 'hitler' : p.role.party,
                    })),
                  losers: room.players
                    .filter(p => p.role.party !== message)
                    .map(p => ({
                      id: p.id,
                      role: p.role.isHitler ? 'hitler' : p.role.party,
                    })),
                })
              }
            },
          }}>
          <GameView />
        </GameContext.Provider>
      )
    }
  }

  return null
}
