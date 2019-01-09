import { PlayerId, Player } from '../interfaces/player'
import { database } from '../helpers/firebase'

export function getPlayer(pid: PlayerId) {
  return database.players
    .doc(pid)
    .get()
    .then(playerSnapshot => {
      const player = playerSnapshot.data()
      if (player) {
        return player as Player
      } else {
        return null
      }
    })
}
