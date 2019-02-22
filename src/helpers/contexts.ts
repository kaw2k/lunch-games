import { createContext } from 'react'
import { Room, RoomId } from '../interfaces/room'
import { Player } from '../interfaces/player'
import { PlayerSecretHitler } from '../games/secret-hitler/interfaces/player'
import * as SH from '../games/secret-hitler/interfaces/game'

import * as WW from '../games/werewolf/interfaces/game'

import { PartialFirebase } from '../interfaces/partialFirebase'
import {
  AvalonGame,
  Party as AvalonParty,
} from '../games/avalon/interfaces/game'
import { PlayerAvalon } from '../games/avalon/interfaces/player'
import { PlayerWerewolf } from '../games/werewolf/interfaces/player'
import { Unpack } from './unpack'

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

export interface WerewolfGameContext {
  game: WW.WerewolfGame
  player: PlayerWerewolf
  updateGamePlayer: (player: PlayerWerewolf) => void
  updateGame: (game: PartialFirebase<WW.WerewolfGame>) => void
  addAction: (
    actions: Unpack<WW.WerewolfGame['actions']> | WW.WerewolfGame['actions']
  ) => void
  addDelayedAction: (
    actions:
      | Unpack<WW.WerewolfGame['delayedActions']>
      | WW.WerewolfGame['delayedActions']
  ) => void
  endGame: (winners?: any, message?: string) => void
}

export const WerewolfGameContext = createContext<WerewolfGameContext>({
  game: {} as WW.WerewolfGame,
  player: {} as PlayerWerewolf,
  updateGamePlayer() {},
  updateGame() {},
  addAction() {},
  addDelayedAction() {},
  endGame() {},
})
