import { Loading } from '../interfaces/loading'
import { useCollection } from 'react-firebase-hooks/firestore'
import { RoomId } from '../interfaces/room'
import { database } from '../helpers/firebase'

export function useRoomList(): Loading<{ data: RoomId[] }> {
  const { value, error, loading } = useCollection(database.rooms)

  const nonEmptyRooms = value
    ? value.docs.map(doc => doc.data()).filter(data => data.lobbyPlayers.length)
    : []

  const roomIds = nonEmptyRooms.map(room => room.id as RoomId)

  if (loading) return { loading: true }
  if (error) return { loading: false, error: true }

  return {
    loading: false,
    error: false,
    data: roomIds,
  }
}
