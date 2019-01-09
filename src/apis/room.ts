import { RoomId, Room } from '../interfaces/room'
import { database } from '../helpers/firebase'

export function get(rid: RoomId) {
  return database.rooms
    .doc(rid)
    .get()
    .then(roomSnapshot => {
      const room = roomSnapshot.data()
      if (room) {
        return room as Room
      } else {
        return null
      }
    })
}

export function set(room: Room) {
  return database.rooms.doc(room.id).set(room)
}
