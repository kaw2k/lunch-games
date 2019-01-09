import { createContext } from 'react'
import { Room, RoomId } from '../interfaces/room'
import { Player, PlayerId } from '../interfaces/player'
import { PlayerSecretHitler } from '../secret-hitler/interfaces/player'
import { SecretHitlerGame, Party } from '../secret-hitler/interfaces/game'

interface RoomContext {
  room: Room
  player: Player
  updatePlayer: (player: PlayerSecretHitler) => void
  setRoom: (room: Room) => void
  updateRoom: (room: Partial<Room>) => void
  joinRoom: (id: RoomId) => void
  leaveRoom: () => void
  kickPlayer: (pid: PlayerId) => void
}

export const RoomContext = createContext<RoomContext>({
  room: {} as Room,
  player: {} as Player,
  updatePlayer() {},
  leaveRoom() {},
  joinRoom() {},
  setRoom() {},
  updateRoom() {},
  kickPlayer() {},
})

interface SecretHitlerGameContext {
  game: SecretHitlerGame
  player: PlayerSecretHitler
  updateGame: (game: Partial<SecretHitlerGame>) => void
  endGame: (winners?: Party, message?: string) => void
}

export const SecretHitlerGameContext = createContext<SecretHitlerGameContext>({
  game: {} as SecretHitlerGame,
  player: {} as PlayerSecretHitler,
  updateGame() {},
  endGame() {},
})
