import { createContext } from 'react'
import { Room, RoomId } from '../interfaces/room'
import { Player } from '../interfaces/player'
import { PlayerSecretHitler } from '../secret-hitler/interfaces/player'
import * as SH from '../secret-hitler/interfaces/game'
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
  game: SH.SecretHitlerGame
  player: PlayerSecretHitler
  updateGamePlayer: (player: PlayerSecretHitler) => void
  updateGame: (game: PartialFirebase<SH.SecretHitlerGame>) => void
  endGame: (winners?: SH.Party, message?: string) => void
}

export const SecretHitlerGameContext = createContext<SecretHitlerGameContext>({
  game: {} as SH.SecretHitlerGame,
  player: {} as PlayerSecretHitler,
  updateGamePlayer() {},
  updateGame() {},
  endGame() {},
})

export interface AvalonGameContext {
  game: AvalonGame
  player: PlayerAvalon
  playersNeeded: number
  failsNeeded: number
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
  playersNeeded: 0,
  failsNeeded: 0,
})
