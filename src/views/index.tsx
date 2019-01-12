import * as React from 'react'
import { Login } from './login'
import { SelectLobby } from './selectLobby'
import { Loading } from '../components/loading'
import { Error } from '../components/error'
import { useAuthState } from '../hooks/useAuthState'
import { useRoom } from '../hooks/useRoom'
import { isSecretHitler, SecretHitlerView } from '../secret-hitler/views'
import { RoomContext } from '../helpers/contexts'
import { LobbyGeneral } from './lobby'
import { isAvalon, AvalonView } from '../avalon/views'

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

  const roomContextValues: RoomContext = {
    room,
    player,
    joinRoom: roomResult.joinRoom,
    leaveRoom: roomResult.leaveRoom,
    setRoom: props => roomResult.setRoom(room.id, props),
    updateRoom: props => roomResult.updateRoom(room.id, props),
    updatePlayer: player => roomResult.updatePlayer(room.id, player),
    kickPlayer: player => roomResult.kickPlayer(room.id, player),
  }

  if (room.type === 'lobby') {
    return (
      <RoomContext.Provider value={roomContextValues}>
        <LobbyGeneral lobby={room} />
      </RoomContext.Provider>
    )
  }

  if (isSecretHitler(room)) {
    return (
      <RoomContext.Provider value={roomContextValues}>
        <SecretHitlerView room={room} />
      </RoomContext.Provider>
    )
  }

  if (isAvalon(room)) {
    return (
      <RoomContext.Provider value={roomContextValues}>
        <AvalonView room={room} />
      </RoomContext.Provider>
    )
  }

  return <Error />
}
