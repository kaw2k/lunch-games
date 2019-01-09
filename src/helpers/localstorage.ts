import { PlayerId } from '../interfaces/player'
import { RoomId } from '../interfaces/room'

function localItem<Type>(key: string) {
  return {
    get(): Type | null {
      return JSON.parse(localStorage.getItem(key) || 'null')
    },

    set(val: Type | null): void {
      localStorage.setItem(key, JSON.stringify(val))
    },
  }
}

export const roomId = localItem<RoomId>('lunch-games-room-id')
export const localUserId = localItem<PlayerId>('player-room-id')
