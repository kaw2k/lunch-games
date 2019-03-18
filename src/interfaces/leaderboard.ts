import { SecretHitlerGame } from '../games/secret-hitler/interfaces/game'
import { AvalonGame } from '../games/avalon/interfaces/game'
import { RoomId } from './room'

export interface GameResultPlayer {
  id: string
  role: string
}

export interface GameResult {
  date: number
  lobby: RoomId
  winners: GameResultPlayer[]
  losers: GameResultPlayer[]
  gameType: SecretHitlerGame['type'] | AvalonGame['type']
}
