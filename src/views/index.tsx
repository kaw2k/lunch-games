import * as React from 'react'
import { Login } from './login'
import { SelectLobby } from './selectLobby'
import { Loading } from '../components/loading'
import { Error } from '../components/error'
import { useAuthState } from '../hooks/useAuthState'
import { useRoom } from '../hooks/useRoom'
import { isSecretHitler, SecretHitlerView } from '../secret-hitler/views'
import { RoomContext } from '../helpers/contexts'

export const App: React.SFC<{}> = () => {
  const playerResult = useAuthState()
  const roomResult = useRoom(
    (!playerResult.loading && !playerResult.error && playerResult.data) || null
  )

  // Generic screens
  if (playerResult.loading || roomResult.loading) return <Loading />
  if (playerResult.error || roomResult.error) return <Error />

  const room = roomResult.data
  const player = playerResult.data

  // Login
  if (!player) {
    return <Login login={playerResult.signIn} />
  }

  // Join a lobby
  if (!room) {
    return (
      <SelectLobby
        player={player}
        logOut={playerResult.signOut}
        joinLobby={roomResult.joinRoom}
        setProfileImg={playerResult.setProfileImg}
        setPlayer={playerResult.setPlayer}
      />
    )
  }

  if (isSecretHitler(room)) {
    return (
      <RoomContext.Provider
        value={{
          room,
          player,
          joinRoom: roomResult.joinRoom,
          setRoom: roomResult.setRoom,
          updateRoom: roomResult.updateRoom,
          leaveRoom: roomResult.leaveRoom,
          updatePlayer: roomResult.updatePlayer,

          kickPlayer: id => {
            roomResult.updateRoom({
              id: room.id,
              type: 'secret-hitler-lobby',
              lobbyPlayers: room.lobbyPlayers.filter(p => p.id !== id),
            })
          },
        }}>
        <SecretHitlerView />
      </RoomContext.Provider>
    )
  }

  return <Error />
}
