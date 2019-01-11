import { RoomId, Room } from '../interfaces/room'
import { database, firebaseArrayRemove } from '../helpers/firebase'
import { Player } from '../interfaces/player'

// ================================================
// NONE OF THESE APIS SHOULD BE USED DIRECTLY
// Instead they should be wrapped with proper types
// in some form of context
// ================================================
export function get(id: RoomId) {
  return database.rooms
    .doc(id)
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

export function set(id: RoomId, room: Room) {
  return database.rooms.doc(room.id).set(room)
}

export function update(id: RoomId, room: Partial<Room>) {
  return database.rooms.doc(id).update(room)
}

export function updatePlayer<P extends Player>(id: RoomId, player: P) {
  return database.rooms.doc(id).update({
    [`players.${player.id}`]: player,
  })
}

export function kickPlayer(id: RoomId, player: Player) {
  return database.rooms.doc(id).update({
    lobbyPlayers: firebaseArrayRemove(player),
  })
}
