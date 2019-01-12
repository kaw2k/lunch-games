import { createContext } from 'react'
import { Room, RoomId } from '../interfaces/room'
import { Player } from '../interfaces/player'
import { PlayerSecretHitler } from '../secret-hitler/interfaces/player'
import {
  SecretHitlerGame,
  Party as SecretHitlerParty,
} from '../secret-hitler/interfaces/game'
import { PartialFirebase } from '../interfaces/partialFirebase'
import { AvalonGame, Party as AvalonParty } from '../avalon/interfaces/game'
import { PlayerAvalon } from '../avalon/interfaces/player'

export interface RoomContext {
  room: Room
  player: Player
  updatePlayer: (player: Player) => void
  setRoom: (room: Room) => void
  updateRoom: (room: PartialFirebase<Room>) => void
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
  updateGame: (game: PartialFirebase<SecretHitlerGame>) => void
  endGame: (winners?: SecretHitlerParty, message?: string) => void
}

export const SecretHitlerGameContext = createContext<SecretHitlerGameContext>({
  game: {} as SecretHitlerGame,
  player: {} as PlayerSecretHitler,
  updateGamePlayer() {},
  updateGame() {},
  endGame() {},
})

export interface AvalonGameContext {
  game: AvalonGame
  player: PlayerAvalon
  updateGamePlayer: (player: PlayerAvalon) => void
  updateGame: (game: PartialFirebase<AvalonGame>) => void
  endGame: (winners?: AvalonParty, message?: string) => void
}

export const AvalonGameContext = createContext<AvalonGameContext>({
  game: {} as AvalonGame,
  player: {} as PlayerAvalon,
  updateGamePlayer() {},
  updateGame() {},
  endGame() {},
})
