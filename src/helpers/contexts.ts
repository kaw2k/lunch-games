import { createContext } from 'react'
import { Room, RoomId } from '../interfaces/room'
import { Player } from '../interfaces/player'
import { PlayerSecretHitler } from '../secret-hitler/interfaces/player'
import { SecretHitlerGame, Party } from '../secret-hitler/interfaces/game'

export interface RoomContext {
  room: Room
  player: Player
  updatePlayer: (player: Player) => void
  setRoom: (room: Room) => void
  updateRoom: (room: Partial<Room>) => void
  joinRoom: (id: RoomId) => void
  leaveRoom: () => void
  kickPlayer: (player: Player) => void
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

export interface SecretHitlerGameContext {
  game: SecretHitlerGame
  player: PlayerSecretHitler
  updateGamePlayer: (player: PlayerSecretHitler) => void
  updateGame: (game: Partial<SecretHitlerGame>) => void
  endGame: (winners?: Party, message?: string) => void
}

export const SecretHitlerGameContext = createContext<SecretHitlerGameContext>({
  game: {} as SecretHitlerGame,
  player: {} as PlayerSecretHitler,
  updateGamePlayer() {},
  updateGame() {},
  endGame() {},
})
