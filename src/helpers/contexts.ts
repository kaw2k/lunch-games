import { createContext } from 'react'
import { Room, RoomId } from '../interfaces/room'
import { Player } from '../interfaces/player'
import { PlayerSecretHitler } from '../games/secret-hitler/interfaces/player'
import * as SH from '../games/secret-hitler/interfaces/game'
import * as M from '../games/murder/interfaces/game'
import * as S from '../games/skull/interfaces/game'
import * as WW from '../games/werewolf/interfaces/game'

import { PartialFirebase } from '../interfaces/partialFirebase'
import {
  AvalonGame,
  Party as AvalonParty,
} from '../games/avalon/interfaces/game'
import { PlayerAvalon } from '../games/avalon/interfaces/player'
import { PlayerWerewolf } from '../games/werewolf/interfaces/player'
import { Unpack } from './unpack'
import { Teams } from '../games/werewolf/interfaces/card'
import { PlayerMurder } from '../games/murder/interfaces/player'

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
  runActions: (actions: WW.WerewolfGame['actions']) => void
  addAction: (
    actions: Unpack<WW.WerewolfGame['actions']> | WW.WerewolfGame['actions']
  ) => void
  addDelayedAction: (
    actions:
      | Unpack<WW.WerewolfGame['delayedActions']>
      | WW.WerewolfGame['delayedActions']
  ) => void
  endGame: (winners?: Teams, message?: string) => void
}

export const WerewolfGameContext = createContext<WerewolfGameContext>({
  game: {} as WW.WerewolfGame,
  player: {} as PlayerWerewolf,
  runActions() {},
  updateGamePlayer() {},
  updateGame() {},
  addAction() {},
  addDelayedAction() {},
  endGame() {},
})

export interface MurderGameContext {
  game: M.MurderGame
  player: PlayerMurder
  updateGamePlayer: (player: PlayerMurder) => void
  updateGame: (game: PartialFirebase<M.MurderGame>) => void
  endGame: (winners?: M.Party, message?: string) => void
}

export const MurderGameContext = createContext<MurderGameContext>({
  game: {} as M.MurderGame,
  player: {} as PlayerMurder,
  updateGamePlayer() {},
  updateGame() {},
  endGame() {},
})

export interface SkullGameContext {
  game: S.SkullGame
  player: S.PlayerSkull
  updateGamePlayer: (player: S.PlayerSkull) => void
  updateGame: (game: PartialFirebase<S.SkullGame>) => void
  endGame: () => void
}

export const SkullGameContext = createContext<SkullGameContext>({
  game: {} as S.SkullGame,
  player: {} as S.PlayerSkull,
  updateGamePlayer() {},
  updateGame() {},
  endGame() {},
})
