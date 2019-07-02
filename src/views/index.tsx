import * as React from 'react'
import { Login } from './login'
import { SelectLobby } from './selectLobby'
import { Loading } from '../components/loading'
import { Error } from '../components/error'
import { useAuthState } from '../hooks/useAuthState'
import { useRoom } from '../hooks/useRoom'
import { isSecretHitler, SecretHitlerView } from '../games/secret-hitler/views'
import { RoomContext } from '../helpers/contexts'
import { LobbyGeneral } from './lobby'
import { isAvalon, AvalonView } from '../games/avalon/views'
import { isWerewolf, WerewolfView } from '../games/werewolf/views'
import { isMurder, MurderView } from '../games/murder/views'
import { useRoomList } from '../hooks/useRoomList'
import { isSkull, SkullView } from '../games/skull/views'

export const App: React.SFC<{}> = () => {
  const playerResult = useAuthState()
  const roomResult = useRoom(
    (!playerResult.loading && !playerResult.error && playerResult.data) || null
  )
  const roomListResult = useRoomList()

  // Generic screens
  if (playerResult.loading || roomResult.loading || roomListResult.loading)
    return <Loading />
  if (playerResult.error || roomResult.error || roomListResult.error)
    return <Error />

  const room = roomResult.data
  const player = playerResult.data
  const roomIds = roomListResult.data

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
        roomIds={roomIds}
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

  if (isWerewolf(room)) {
    return (
      <RoomContext.Provider value={roomContextValues}>
        <WerewolfView room={room} />
      </RoomContext.Provider>
    )
  }

  if (isMurder(room)) {
    return (
      <RoomContext.Provider value={roomContextValues}>
        <MurderView room={room} />
      </RoomContext.Provider>
    )
  }

  if (isSkull(room)) {
    return (
      <RoomContext.Provider value={roomContextValues}>
        <SkullView room={room} />
      </RoomContext.Provider>
    )
  }

  return <Error />
}
