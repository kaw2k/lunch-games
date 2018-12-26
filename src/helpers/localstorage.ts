import { RoomId } from '../interfaces/game'
import { PlayerId } from '../interfaces/player'

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
