import * as React from 'react'
import { Player } from '../interfaces/player'
import { Loading } from '../interfaces/loading'
import { useDocument } from 'react-firebase-hooks/firestore'
import { Room, RoomId } from '../interfaces/room'
import { SecretHitlerLobby } from '../secret-hitler/interfaces/game'
import * as RoomAPI from '../apis/room'
import * as local from '../helpers/localstorage'
import { database } from '../helpers/firebase'
import * as firebase from 'firebase'

export function useRoom<T extends Player>(
  player: Player | null
): Loading<{
  data: Room | null
  setRoom: (room: Room) => void
  updateRoom: (room: Partial<Room>) => void
  updatePlayer: (player: T) => void
  joinRoom: (id: RoomId) => void
  leaveRoom: () => void
}> {
  const [roomId, setRoomId] = React.useState(local.roomId.get())

  const doc = database.rooms.doc(roomId || 'null')
  const { value, error, loading } = useDocument(doc)
  const room = value ? (value.data() as Room) || null : null

  React.useEffect(
    () => {
      // The game doesn't exist, nor does the lobby. Create it.
      if (!room && !loading && !error && roomId && player) {
        const lobby: SecretHitlerLobby = {
          type: 'secret-hitler-lobby',
          id: roomId,
          lobbyPlayers: [player],
        }
        database.rooms.doc(roomId).set(lobby)
      }

      // If we are not part of the lobby, kick us out
      if (
        room &&
        player &&
        !room.lobbyPlayers.find(p => p.id === (player as Player).id)
      ) {
        leaveRoom()
      }
    },
    [loading, room && room.lobbyPlayers.length]
  )

  async function joinRoom(id: RoomId) {
    if (!player) return

    const room = await RoomAPI.get(id)
    if (!room) {
      await RoomAPI.set({
        type: 'secret-hitler-lobby',
        id: id,
      } as Room)
    }

    database.rooms.doc(id).update({
      lobbyPlayers: firebase.firestore.FieldValue.arrayUnion(player),
    })

    local.roomId.set(id)
    setRoomId(id)
  }

  async function leaveRoom() {
    if (roomId && player) {
      const room = await RoomAPI.get(roomId)
      if (room) {
        setRoom({
          ...room,
          lobbyPlayers: room.lobbyPlayers.filter(
            p => p.id !== (player as Player).id
          ),
        })
      }
    }

    local.roomId.set(null)
    setRoomId(null)
  }

  function setRoom(props: Room) {
    doc.set(props)
  }

  function updateRoom(props: Partial<Room>) {
    doc.update(props)
  }

  async function updatePlayer(player: T) {
    console.log('...')
    if (room && room.type === 'secret-hitler-game') {
      doc.update({
        [`players.${player.id}`]: player,
      })
    }
  }

  if (loading) return { loading: true }
  if (error) return { loading: false, error: true }

  return {
    loading: false,
    error: false,
    data: room,
    joinRoom,
    leaveRoom,
    updateRoom,
    setRoom,
    updatePlayer,
  }
}
