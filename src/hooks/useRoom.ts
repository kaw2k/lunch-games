import * as React from 'react'
import { Player } from '../interfaces/player'
import { Loading } from '../interfaces/loading'
import { useDocument } from 'react-firebase-hooks/firestore'
import { Room, RoomId } from '../interfaces/room'
import * as RoomAPI from '../apis/room'
import * as local from '../helpers/localstorage'
import { database, firebaseArrayAdd } from '../helpers/firebase'

export function useRoom(
  player: Player | null
): Loading<{
  data: Room | null
  setRoom: typeof RoomAPI.set
  updateRoom: typeof RoomAPI.update
  updatePlayer: typeof RoomAPI.updatePlayer
  kickPlayer: typeof RoomAPI.kickPlayer
  joinRoom: (id: RoomId) => void
  leaveRoom: () => void
}> {
  const [roomId, setRoomId] = React.useState(local.roomId.get())

  const doc = database.rooms.doc(roomId || 'null')
  const { value, error, loading } = useDocument(doc)
  const room = value ? (value.data() as Room) || null : null

  React.useEffect(
    () => {
      // If we are not part of the lobby, kick us out
      if (
        room &&
        player &&
        !room.lobbyPlayers.find(p => p.id === (player as Player).id)
      ) {
        local.roomId.set(null)
        setRoomId(null)
      }
    },
    [loading, room && (room.lobbyPlayers || []).length]
  )

  if (loading) return { loading: true }
  if (error) return { loading: false, error: true }

  return {
    loading: false,
    error: false,

    data: room,

    updateRoom: RoomAPI.update,
    setRoom: RoomAPI.set,
    updatePlayer: RoomAPI.updatePlayer,
    kickPlayer: RoomAPI.kickPlayer,

    leaveRoom() {
      if (!roomId || !player) return

      RoomAPI.kickPlayer(roomId, player)
    },

    async joinRoom(id) {
      if (!player) return

      const room = await RoomAPI.get(id)

      if (!room) {
        await RoomAPI.set(id, {
          type: 'lobby',
          id: id,
        } as Room)
      }

      await database.rooms.doc(id).update({
        lobbyPlayers: firebaseArrayAdd(player),
      })

      local.roomId.set(id)
      setRoomId(id)
    },
  }
}
